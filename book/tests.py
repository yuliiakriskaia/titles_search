import unittest

from data_source import BookDataSource
from searcher import Searcher
from index import BookInvertedIndex


class TestSearcher(unittest.TestCase):
    def setUp(self):
        self.index_path = 'test_data/test_inverted_index.p'
        self.books_path = 'test_data/test_cooking_books.tsv'
        self.query = 'your cooking'

    def test_search(self):
        book_inverted_index = BookInvertedIndex(self.index_path)
        book_data_source = BookDataSource(self.books_path)
        searcher = Searcher(book_inverted_index, book_data_source)
        search_results = searcher.search(self.query)
        self.assertEqual(search_results, [('B000SEIJE2',
                                           'Cooking with Convection: Everything You Need to Know to Get the Most from '
                                           'Your Convection Oven', 1.0),
                                          ('B000UZNREG', 'Deceptively Delicious: Simple Secrets to Get Your Kids Eating '
                                                         'Good Food', 0.5)])


class TestDataSource(unittest.TestCase):
    def setUp(self):
        self.books_path = 'test_data/test_cooking_books.tsv'
        self.book_id = 'B000UZNREG'

    def test_get_title_by_id(self):
        book_data_source = BookDataSource(self.books_path)
        title = book_data_source.get_title_by_id(self.book_id)
        self.assertEqual(title, 'Deceptively Delicious: Simple Secrets to Get Your Kids Eating Good Food')


class TestIndex(unittest.TestCase):
    def setUp(self):
        self.index_path = 'test_data/test_inverted_index.p'
        self.books_path = 'test_data/test_cooking_books.tsv'
        self.keyword = 'secrets'

    def test_get_index_data(self):
        book_data_source = BookDataSource(self.books_path)
        book_inverted_index = BookInvertedIndex(self.index_path)
        book_inverted_index.initialize(book_data_source.get_book_data())
        index_dict = book_inverted_index.get_index_data()
        self.assertEqual(index_dict[self.keyword], ['B000UZNREG'])


if __name__ == '__main__':
    unittest.main()


