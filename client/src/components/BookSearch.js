import React from 'react';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';
import BookList from './BookList';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactSpinner from 'react-spinjs';


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
                    isLoading: false,
                    isShowingModal: false,
                    modalData: {}
                };
    },
    handleClose: function() {
    this.setState({isShowingModal: false});
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
                console.log(data);
                if ('error' in data) {
                    this.setState({
                            books: [],
                            executionTime: 0,
                            elementsNumber: 0,
                            offset: 0,
                            pageBooks: [],
                            pageCount: 0
                    });
                }
                else {
                    this.setState({
                        books: data['books'],
                        executionTime: data['execution_time'],
                        elementsNumber: data['books'].length,
                        offset: 0,
                        pageBooks: data['books'].slice(0, this.props.perPage),
                        pageCount: Math.ceil(data['books'].length/this.props.perPage)});
                }
            },
            error: (xhr, status, err) => {
                console.log(xhr);
            }
        });
    },
    loadBookInformation: function(book_id) {
        console.log(book_id);
        this.setState({isLoading: true, isShowingModal: true});
        $.ajax({
            contentType: "application/json; charset=utf-8",
            type: 'GET',
            url: '/books/' + book_id,
            dataType: 'json',
            cache: false,
            success: data => {
                console.log(data);
                this.setState({isLoading: false, modalData: data});
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
                            <BookList books={this.state.pageBooks} keywordsList={this.state.query.split(/\s+/)}
                                loadBookInformation={this.loadBookInformation} />
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

             {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                  {
                    this.state.isLoading ?
                    <ReactSpinner/> :
                    <ModalDialog onClose={this.handleClose}>
                      <h1>Book #{this.state.modalData["id"]}</h1>
                      <form className="form" onSubmit={(e) => {e.preventDefault()}}>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="title" className="col-lg-2 control-label">Title: </label>
                                <div className="col-lg-10">
                                    <p id="title">{ this.state.modalData['title'] }</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="category" className="col-lg-2 control-label">Category: </label>
                                <div className="col-lg-10">
                                    <p id="category">{ this.state.modalData['category'] }</p>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                    </ModalDialog>
                  }
                </ModalContainer>
              }
        </div>
        );
    }
});

export default BookSearch;
