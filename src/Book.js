import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Book = ({data, searchContext, onUpdateShelf, format}) => {
    const {id, imageLinks, title, authors, averageRating, ratingsCount, shelf} = data;
    const bookThumbnail = imageLinks ? imageLinks.smallThumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover';

    return (
        <div className="book" id={id}>
            <div className="book-top">
                <div className="book-cover">
                    {!searchContext && (
                        <Link to={"/book/" + id}>
                            <img src={bookThumbnail} width={128} height={192} alt={title}/>
                        </Link>
                    )}
                    {searchContext && (
                        <img src={bookThumbnail} width={128} height={192} alt={title}/>
                    )}
                </div>
                <div className="book-shelf-changer">
                    <select onChange={event => onUpdateShelf(id, event.target.value)} value={shelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        {searchContext && (
                            <option value="none">None</option>
                        )}
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors && authors.join(', ')}</div>
            {format === "single" && (
                <div className="book-authors">Avg {averageRating} from {ratingsCount} Ratings</div>
            )}
        </div>
    )
};

Book.propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
};

export default Book