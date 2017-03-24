import React from 'react';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';
import BookList from './BookList';

var BookSearch = React.createClass({
    getInitialState: function () {
        return {
                    query: '',
                    books: [],
                    executionTime: 0,
                    elementsNumber: 0,
                    offset: 0,
                    pageBooks: [],
                    pageCount: 0,
                };
    },
    handleQueryChange: function (e) {
        this.setState({query: e.target.value});
    },
    searchBooks: function () {
        console.log("search books", this.state.query);
        var query = this.state.query;
        $.ajax({
            contentType: "application/json; charset=utf-8",
            type: 'GET',
            url: '/search',
            dataType: 'json',
            cache: false,
            data: {"query": query},
            success: data => {
                if (!('error' in data)) {
                    console.log(data);
                    this.setState({
                        books: data['books'],
                        executionTime: data['execution_time'],
                        elementsNumber: data['books'].length,
                        pageBooks: data['books'].slice(0, this.props.perPage),
                        pageCount: Math.ceil(data['books'].length/this.props.perPage)});
                }
            },
            error: (xhr, status, err) => {
                console.log(xhr);
            }
        });
    },
    handlePageClick: function (data) {
        var selected = data.selected;
        var offset = selected * this.props.perPage;

        this.setState({offset: offset, pageBooks: this.state.books.slice(offset, offset+this.props.perPage)});
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
                            <p>Execution time: { this.state.executionTime } </p>
                            <p>Elements number: { this.state.elementsNumber } </p>
                        </div>
                        {this.state.books.length !== 0 && <div className="container form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <BookList books={this.state.pageBooks} />
                            <ReactPaginate previousLabel={"<<"}
                               nextLabel={">>"}
                               breakLabel={<a href="">...</a>}
                               breakClassName={"break-me"}
                               pageCount={this.state.pageCount}
                               marginPagesDisplayed={2}
                               pageRangeDisplayed={5}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination"}
                               subContainerClassName={"pages pagination"}
                               activeClassName={"active"} />
                        </div>}
                        { !this.state.books.length && <div className="container form-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <p>No content.</p>
                        </div>}
                    </div>
             </form>
        </div>
        );
    }
});

export default BookSearch;