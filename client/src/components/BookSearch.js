import React from 'react';
import $ from 'jquery';
import readCookie from '../readCookie';
import BookList from './BookList';

var BookSearch = React.createClass({
    getInitialState: function () {
        return {query: '', books: []};
    },
    handleQueryChange: function (e) {
        this.setState({query: e.target.value});
    },
    searchBooks: function () {
        console.log("search books", this.state.query);
        $.ajax({
            contentType: "application/json; charset=utf-8",
            type: 'POST',
            url: '/',
            dataType: 'json',
            cache: false,
            data: JSON.stringify({"query": this.state.query}),
            success: data => {
                if (!('error' in data)) {
                    this.setState({books: data['books']});
                }
            },
            error: (xhr, status, err) => {
                console.log(xhr);
            }
        });
    },
    render: function () {

        return (
        <div>
            <form className="navbar-form navbar-left" role="search">
                    <div className="form-group col-xs-12 col-sm-12 col-md-8 col-lg-10">
                        <input type="text" className="form-control" placeholder="Search" value={ this.state.query }
                               onChange={ this.handleQueryChange }/>
                    </div>
                    <div className="form-group">
                        <button id="search" type="button" className="btn btn-default" onClick={ this.searchBooks }>
                        Search
                        </button>
                    </div>
                    <div className={this.state.books===[]?"content":"hidden"}>
                        <BookList books={this.state.books} />
                    </div>
                    <div className={this.state.books===[]?"hidden":"content"}>
                        No content.
                    </div>
             </form>
        </div>
        );
    }
});

export default BookSearch;