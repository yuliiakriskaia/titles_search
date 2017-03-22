import React from 'react';
import $ from 'jquery';
import BookList from './BookList';

var BookSearch = React.createClass({
    getInitialState: function () {
        return {query: '', books: [], execution_time: 0, elements_number: 0};
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
                    console.log(data);
                    this.setState({
                        books: data['books'],
                        execution_time: data['execution_time'],
                        elements_number: data['books'].length});
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
                    <div className="form-group col-xs-12 col-sm-12 col-md-4 col-lg-6">
                        <input type="text" className="form-control" placeholder="Search" value={ this.state.query }
                               onChange={ this.handleQueryChange }/>
                    </div>
                    <div className="form-group col-xs-12 col-sm-12 col-md-4 col-lg-6">
                        <button id="search" type="button" className="btn btn-default" onClick={ this.searchBooks }>
                        Search
                        </button>
                    </div>
                    <div className="content">
                        <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <p>Execution time: { this.state.execution_time } </p>
                            <p>Elements number: { this.state.elements_number } </p>
                        </div>
                        <BookList books={this.state.books} />
                    </div>
             </form>
        </div>
        );
    }
});

export default BookSearch;