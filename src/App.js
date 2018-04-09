import React from 'react'
import {Link, Route} from 'react-router-dom'

import './App.css'
import BookList from './BookList'
import {getAll} from "./BooksAPI";

class BooksApp extends React.Component {
    state = {
        books: []
    };

    componentDidMount() {
        getAll().then(newBooks => this.setState({
            books: newBooks
        }));
    }

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
                                <input type="text" placeholder="Search by title or author"/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid"></ol>
                        </div>
                    </div>
                )}/>
                <Route path='/:id' render={(router) => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookList
                                    title={"Book"}
                                    books={this.state.books.filter(book => book.id === router.match.params.id)}
                                    format={"single"}/>
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
                                    format={"list"}/>
                                <BookList
                                    title={"Want to Read"}
                                    books={this.state.books.filter(book => book.shelf === "wantToRead")}
                                    format={"list"}/>
                                <BookList
                                    title={"Read"}
                                    books={this.state.books.filter(book => book.shelf === "read")}
                                    format={"list"}/>
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
