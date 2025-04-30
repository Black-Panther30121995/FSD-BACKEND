import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DeleteBook.css';

const DeleteBook = () => {
    const [books, setBooks] = useState([]);

    // Fetch all books on component mount
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get('http://localhost:9000/books');
            setBooks(res.data);
        } catch (error) {
            console.error(error);
            alert('Error fetching books');
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = confirm('Are you sure you want to delete this book?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:9000/books/${id}`);
            alert('Book deleted successfully');
            fetchBooks(); // Refresh book list after deletion
        } catch (error) {
            console.error(error);
            alert('Error deleting book');
        }
    };

    return (
        <div className="delete-book-container">
            <h2 className="delete-book-title">Delete Books</h2>
            <div className="delete-book-content">
                {books.length === 0 ? (
                    <p className="delete-book-empty">No books available</p>
                ) : (
                    <ul className="delete-book-list">
                        {books.map((book) => (
                            <li key={book._id} className="delete-book-item">
                                <span className="delete-book-details">
                                    <strong>{book.title}</strong> by {book.author}
                                </span>
                                <button
                                    onClick={() => handleDelete(book._id)}
                                    className="delete-book-button"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DeleteBook;