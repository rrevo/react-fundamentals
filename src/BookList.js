import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Book from './Book'

class BookList extends Component {
    render() {
        const {title, books, format} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">
                    {this.props.format === "single" && <Link to="/">All</Link>}
                    {this.props.format === "single" && <span> &gt; </span>}
                    {title}
                </h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Book data={book} format={format} onUpdateShelf={this.props.onUpdateShelf}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

BookList.propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
};

export default BookList