import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Book from './Book'

const BookList = ({title, books, format, onUpdateShelf, searchContext}) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">
            {format === "single" && <Link to="/">All</Link>}
            {format === "single" && <span> &gt; </span>}
            {title}
        </h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                        <Book data={book}
                              format={format}
                              onUpdateShelf={onUpdateShelf}
                              searchContext={searchContext}/>
                    </li>
                ))}
            </ol>
        </div>
    </div>
);

BookList.propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
};

export default BookList