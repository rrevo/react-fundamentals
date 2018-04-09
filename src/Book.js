import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Book extends Component {
    render() {
        const {id, imageLinks, title, authors, averageRating, ratingsCount} = this.props.data;

        return (
            <div className="book" id={id}>
                <div className="book-top">
                    <div className="book-cover">
                        <Link to={"/" + id}>
                            <img src={imageLinks.smallThumbnail} width={128} height={192} alt={title}/>
                        </Link>
                    </div>
                    <div className="book-shelf-changer">
                        <select>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors.join(', ')}</div>
                {this.props.format === "single" && (
                    <div className="book-authors">Avg {averageRating} from {ratingsCount} Ratings</div>
                )}
            </div>
        )
    }
}

export default Book