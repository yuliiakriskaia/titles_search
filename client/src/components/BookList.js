import React from 'react';
import Book from './Book';

var BookList = React.createClass({
    render: function () {
         console.log(this.props.books);
         var books = this.props.books.map(book =>
                <Book key={book[0]} id={book[0]} title={book[1]} score={book[2]}
                loadBookInformation={this.props.loadBookInformation} keywordsList={this.props.keywordsList}/>
            );
        return (
            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-10">
                <table className="table table-striped table-hover">
                    <caption>{this.props.title}</caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Keywords</th>
                            <th>Score</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {books}
                    </tbody>
                </table>
            </div>
        );
    }
});

export default BookList;