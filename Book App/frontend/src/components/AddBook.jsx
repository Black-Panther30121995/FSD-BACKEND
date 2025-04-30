import React from 'react';
import axios from 'axios';
import './AddBook.css';

const AddBook = () => {
    const handleBook = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const author = e.target.author.value;
        const date = e.target.date.value;
        const image = e.target.image.value;
        const books = { title, author, date, image };
        await axios.post('http://localhost:9000/books', books);
        alert('Book Added Successfully');
    };

    return (
        <div className="add-book-container">
            <h1 className="add-book-title">Add Book</h1>
            <form onSubmit={handleBook} className="add-book-form">
                <label className="add-book-label">Title:</label>
                <input type="text" name="title" required className="add-book-input" />
                <label className="add-book-label">Author:</label>
                <input type="text" name="author" required className="add-book-input" />
                <label className="add-book-label">Date:</label>
                <input type="date" name="date" required className="add-book-input" />
                <label className="add-book-label">Image:</label>
                <input type="text" name="image" required className="add-book-input" />
                <button type="submit" className="add-book-button">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;