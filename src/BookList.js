import React, {Component} from 'react'
import Book from './Book'

class BookList extends Component {
    render() {
        const {title, books} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.title}>
                                <Book coverWidth={book.coverWidth}
                                      coverHeight={book.coverHeight}
                                      coverUrl={book.coverUrl}
                                      title={book.title}
                                      authors={book.authors}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookList