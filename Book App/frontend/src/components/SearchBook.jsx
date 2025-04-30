import React, { useState } from 'react';
import axios from 'axios';
import './SearchBook.css';

const SearchBook = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const handleSearch = async () => {
        if (!query) {
            alert('Please enter a title to search');
            return;
        }

        try {
            const res = await axios.get(`https://fsd-backend-10.onrender.com/search?title=${query}`);
            setBooks(res.data);
        } catch (error) {
            console.error(error);
            alert('Error while fetching books');
        }
    };

    return (
        <div className="search-book-container">
            <h2 className="search-book-title">Search Books</h2>
            <div className="search-book-form">
                <input
                    type="text"
                    placeholder="Enter book title"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-book-input"
                />
                <button onClick={handleSearch} className="search-book-button">
                    Search
                </button>
            </div>
            <div className="search-book-content">
                {books.length > 0 ? (
                    <ul className="search-book-list">
                        {books.map((book) => (
                            <li key={book._id} className="search-book-item">
                                <div className="search-book-details">
                                    <strong>{book.title}</strong> by {book.author}
                                </div>
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="search-book-image"
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="search-book-empty">No books found</p>
                )}
            </div>
        </div>
    );
};

export default SearchBook;