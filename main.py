import argparse

from settings import INVERTED_INDEX_FILE, COOKING_BOOKS_FILE
from book.searcher import Searcher
from book.index import BookInvertedIndex
from book.data_source import BookDataSource


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Search titles by query')
    parser.add_argument('query', nargs='?', const='', type=str,
                        help='Input search query like \"search_text\"')
    args = parser.parse_args()
    book_inverted_index = BookInvertedIndex(INVERTED_INDEX_FILE)
    book_data_source = BookDataSource(COOKING_BOOKS_FILE)
    searcher = Searcher(book_inverted_index, book_data_source)
    search_results = searcher.search(args.query)

    for id, title, score in search_results:
        print(id, title, score)

