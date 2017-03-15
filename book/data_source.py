from collections import namedtuple

from abc import abstractmethod


Book = namedtuple('Book', 'id title')


class BookDataSourceBase(object):
    @abstractmethod
    def get_book_data(self):
        pass

    @abstractmethod
    def get_title_by_id(self, book_id):
        pass


class BookDataSource(BookDataSourceBase):
    def __init__(self, file_path):
        self.file_path = file_path

    def get_book_data(self):
        with (open(self.file_path, 'r')) as cooking_books_file:
            for line in cooking_books_file:
                id, title, branch = line.strip().split('\t')
                yield Book(id=id, title=title)

    def get_title_by_id(self, book_id):
        with (open(self.file_path, 'r')) as cooking_books_file:
            for line in cooking_books_file:
                id, title, branch = line.strip().split('\t')
                if book_id == id:
                    return title
