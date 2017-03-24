import re


class Searcher(object):
    def __init__(self, book_inverted_index, book_data_source):
        book_inverted_index.initialize(book_data_source.get_book_data())
        self.book_inverted_index = book_inverted_index
        self.book_data_source = book_data_source

    def search(self, query):
        results = []
        if query:
            keywords = [keyword.lower() for keyword in query.split()]
            keywords_set = set(keywords)
            titles_ids = []
            # get list of title ids which contain any of given keywords
            inverted_index = self.book_inverted_index.get_index_data()
            for keyword in keywords_set:
                if keyword in inverted_index.keys():
                    titles_ids += inverted_index[keyword]
            # score results
            for title_id in set(titles_ids):
                title = self.book_data_source.get_book_information(title_id)["title"]
                results.append((title_id, title, self.score_result(keywords_set, title)))

        return sorted(results, reverse=True, key=lambda t: t[2])

    def score_result(self, keywords_set, title):
        keywords = re.findall(r'\w+', title)
        title_set = set([keyword.lower() for keyword in keywords])

        return len(keywords_set.intersection(title_set))/float(len(keywords_set))

