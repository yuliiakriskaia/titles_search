import json
from time import time

from flask import request
from flask import Flask
app = Flask(__name__)

from book.data_source import BookDataSource
from book.index import BookInvertedIndex
from book.searcher import Searcher

from settings import INVERTED_INDEX_FILE, COOKING_BOOKS_FILE


@app.route('/', methods=['POST'])
def search():
    if request.method == 'POST':
        response_dict = {}
        book_inverted_index = BookInvertedIndex(INVERTED_INDEX_FILE)
        book_data_source = BookDataSource(COOKING_BOOKS_FILE)
        searcher = Searcher(book_inverted_index, book_data_source)
        data = request.data
        start = time()
        search_results = searcher.search(json.loads(data)['query'])
        time_delta = time()-start
        if search_results:
            response_dict['books'] = search_results
            response_dict['execution_time'] = time_delta
            response_dict['status_code'] = 200
        else:
            response_dict['error'] = 'No content'
            response_dict['status_code'] = 204
        return json.dumps(response_dict)

