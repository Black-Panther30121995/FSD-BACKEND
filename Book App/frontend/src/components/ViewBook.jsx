import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewBook.css';

const ViewBook = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        handleView();
    }, []);

    const handleView = async () => {
        try {
            const res = await axios.get('http://localhost:9000/books');
            setBooks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="view-book-container">
            <h1 className="view-book-title">View Book Details</h1>
            <div className="view-book-list">
                {books.map((book) => (
                    <div key={book._id} className="view-book-item">
                        <img
                            src={book.image}
                            alt={book.title}
                            className="view-book-image"
                        />
                        <h3 className="view-book-title-text">{book.title}</h3>
                        <h2 className="view-book-author">{book.author}</h2>
                        <h2 className="view-book-date">{book.date}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewBook;