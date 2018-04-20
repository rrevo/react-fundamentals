import React from 'react';
import {Link, Route} from 'react-router-dom';

import './App.css';
import BookList from './BookList';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
    state = {
        books: [],
        searchBooks: []
    };

    componentDidMount() {
        BooksAPI.getAll().then(newBooks => this.setState({
            books: newBooks
        }));
    }

    getCurrentBook = (searchBook) => {
        return this.state.books.filter((book) => book.id === searchBook.id);
    };

    updateBook = (bookId, shelf) => {
        if (shelf === "none") {
            return;
        }
        let currentBook = this.getCurrentBook({id: bookId});
        if (Array.isArray(currentBook) && currentBook.length === 1) {
            // Current book case
            this.setState((currentState) => ({
                books: currentState.books.map((currentBook) => {
                    if (bookId === currentBook.id) {
                        currentBook.shelf = shelf;
                    }
                    return currentBook;
                })
            }));
            BooksAPI.update({id: bookId}, shelf);
        } else {
            // New book from search
            BooksAPI.get(bookId)
                .then((book) => {
                    book.shelf = shelf;
                    let newBooks = this.state.books;
                    newBooks.push(book);
                    this.setState((currentState) => ({
                        books: newBooks
                    }));
                })
                .finally(() => (BooksAPI.update({id: bookId}, shelf)));
        }
    };

    searchQuery = (term) => {
        if (!term) {
            return;
        }
        // TODO multiple terms..
        BooksAPI.search(term)
            .then(results => {
                if (!Array.isArray(results)) {
                    results = []
                }
                // Set shelf if book is found in current known state
                let newSearchBooks = results.map((book) => {
                    let currentBook = this.getCurrentBook(book);
                    if (Array.isArray(currentBook) && currentBook.length === 1) {
                        book.shelf = currentBook[0].shelf
                    }
                    return book;
                });
                this.setState((currentState) => ({
                    searchBooks: newSearchBooks
                }));
            })
    };

    render() {
        return (
            <div className="app">
                <Route exact path='/search' render={() => (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link className="close-search" to="/">Close</Link>
                            <div className="search-books-input-wrapper">
                                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                                <input type="text"
                                       placeholder="Search by title or author"
                                       onChange={(event) => this.searchQuery(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="search-books-results">
                            <BookList
                                title={"Search Results"}
                                books={this.state.searchBooks}
                                format={"list"}
                                onUpdateShelf={this.updateBook}
                                searchContext={true}
                            />
                        </div>
                    </div>
                )}/>
                <Route exact path='/book/:id' render={(router) => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookList
                                    title={"Book"}
                                    books={this.state.books.filter(book => book.id === router.match.params.id)}
                                    format={"single"}
                                    onUpdateShelf={this.updateBook}
                                    searchContext={false}
                                />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to='/search'>Add a book</Link>
                        </div>
                    </div>
                )}/>
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookList
                                    title={"Currently Reading"}
                                    books={this.state.books.filter(book => book.shelf === "currentlyReading")}
                                    format={"list"}
                                    onUpdateShelf={this.updateBook}
                                    searchContext={false}
                                />
                                <BookList
                                    title={"Want to Read"}
                                    books={this.state.books.filter(book => book.shelf === "wantToRead")}
                                    format={"list"}
                                    onUpdateShelf={this.updateBook}
                                    searchContext={false}
                                />
                                <BookList
                                    title={"Read"}
                                    books={this.state.books.filter(book => book.shelf === "read")}
                                    format={"list"}
                                    onUpdateShelf={this.updateBook}
                                    searchContext={false}
                                />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to='/search'>Add a book</Link>
                        </div>
                    </div>
                )}/>
            </div>
        )
    }
}

export default BooksApp
