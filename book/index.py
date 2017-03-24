import re
import pickle

from abc import abstractmethod


class BookIndexBase(object):
    @abstractmethod
    def initialize(self, books):
        pass

    @abstractmethod
    def get_index_data(self):
        pass


class BookInvertedIndex(BookIndexBase):
    def __init__(self, file_path):
        self.file_path = file_path
        self.data = None

    def initialize(self, books):
        self.data = None
        inverted_index = {}
        for book in books:
            # get title keywords
            keywords = re.findall(r'\w+', book.title)
            # form dict of keywords and list of titles with them
            for keyword in keywords:
                if keyword.lower() not in inverted_index.keys():
                    inverted_index[keyword.lower()] = [book.id]
                    continue
                inverted_index[keyword.lower()].append(book.id)

        with open(self.file_path, 'wb') as inverted_index_file:
            pickle.dump(inverted_index, inverted_index_file)

    def get_index_data(self):
        if not self.data:
            with open(self.file_path, "rb") as inverted_index_file:
                inverted_index_data = pickle.load(inverted_index_file)
                self.data = inverted_index_data
        return self.data
