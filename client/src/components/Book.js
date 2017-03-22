import React from 'react';

var Book = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{ this.props.id }</td>
                <td>{ this.props.title }</td>
                <td>{ this.props.score }</td>
            </tr>
        );
    }
});

export default Book;