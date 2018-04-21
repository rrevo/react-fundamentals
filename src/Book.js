import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Book extends Component {
    render() {
        const {id, imageLinks, title, authors, averageRating, ratingsCount, shelf} = this.props.data;

        return (
            <div className="book" id={id}>
                <div className="book-top">
                    <div className="book-cover">
                        {!this.props.searchContext && (
                            <Link to={"/book/" + id}>
                                {imageLinks && imageLinks.smallThumbnail &&
                                (<img src={imageLinks.smallThumbnail} width={128} height={192} alt={title}/>)}
                                {(!imageLinks || !imageLinks.smallThumbnail) &&
                                (<div>{title}</div>)}
                            </Link>
                        )}
                        {this.props.searchContext && imageLinks && imageLinks.smallThumbnail && (
                            <img src={imageLinks.smallThumbnail} width={128} height={192} alt={title}/>
                        )}
                        {this.props.searchContext && !imageLinks && (
                            <div>{title}</div>
                        )}
                    </div>
                    <div className="book-shelf-changer">
                        <select onChange={event => this.props.onUpdateShelf(id, event.target.value)} value={shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            {this.props.searchContext && (
                                <option value="none">None</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors && authors.join(', ')}</div>
                {this.props.format === "single" && (
                    <div className="book-authors">Avg {averageRating} from {ratingsCount} Ratings</div>
                )}
            </div>
        )
    }
}

Book.propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
};

export default Book