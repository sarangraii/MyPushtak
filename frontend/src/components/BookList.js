import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';
import OrderForm from './OrderForm';
import { getBooks } from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBooks();
      setBooks(response.data);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = (book) => {
    setSelectedBook(book);
    setShowOrderForm(true);
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
    setSelectedBook(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading amazing books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={fetchBooks}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h2>Featured Books</h2>
        <p>Discover our carefully curated collection of books</p>
      </div>
      
      <div className="books-grid">
        {books.map(book => (
          <BookItem 
            key={book.id} 
            book={book} 
            onClick={handleOrderClick}
          />
        ))}
      </div>

      {showOrderForm && (
        <OrderForm 
          book={selectedBook} 
          onClose={handleCloseOrderForm}
        />
      )}
    </div>
  );
};

export default BookList;