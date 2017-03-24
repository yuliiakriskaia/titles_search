import json
import time

from flask import request
from flask import Flask
app = Flask(__name__)

from book.data_source import BookDataSource
from book.index import BookInvertedIndex
from book.searcher import Searcher

from settings import INVERTED_INDEX_FILE, COOKING_BOOKS_FILE, DELAY


book_inverted_index = BookInvertedIndex(INVERTED_INDEX_FILE)
book_data_source = BookDataSource(COOKING_BOOKS_FILE)
searcher = Searcher(book_inverted_index, book_data_source)


@app.route('/search', methods=['GET'])
def search():
    response_dict = {}
    start = time.time()
    search_results = searcher.search(request.args.get('query'))
    time_delta = time.time()-start

    if search_results:
        response_dict['books'] = search_results
        response_dict['execution_time'] = time_delta
        response_dict['status_code'] = 200
    else:
        response_dict['error'] = 'No content'
        response_dict['status_code'] = 204

    return json.dumps(response_dict)


@app.route('/books/<book_id>', methods=['GET'])
def get_book_information(book_id):
    book_info = book_data_source.get_book_information(book_id)
    time.sleep(DELAY)

    return json.dumps(book_info)