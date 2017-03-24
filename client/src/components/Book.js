import React from 'react';

var Book = React.createClass({
    getBookInformation: function()
    {
        this.props.loadBookInformation(this.props.id);
    },
    render: function () {
        var keywords = this.props.keywordsList.map(keyword =>
        {
            if (this.props.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                return (<p>{keyword.toLowerCase()}</p>);
            }
            else {
                return (<p><strike> { keyword.toLowerCase() } </strike></p>);
            }
        }
        );
        return (
            <tr>
                <td>{ this.props.id }</td>
                <td>{ this.props.title }</td>
                <td>{ keywords }</td>
                <td>{ this.props.score }</td>
                <td><a href="#" onClick={this.getBookInformation}>&#x1F6C8;</a></td>
            </tr>
        );
    }
});

export default Book;