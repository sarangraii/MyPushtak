
import React, { useState } from 'react';

const BookItem = ({ book, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Fallback image in case the real image fails to load
  const fallbackImage = `https://via.placeholder.com/200x300/4F46E5/FFFFFF?text=${encodeURIComponent(book.title)}`;

  return (
    <div className="book-item">
      <div className="book-cover-container">
        <div className="book-cover">
          {!imageLoaded && !imageError && (
            <div className="image-placeholder">
              <div className="loading-spinner"></div>
            </div>
          )}
          <img
            src={imageError ? fallbackImage : book.image}
            alt={book.title}
            className={`book-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          <div className="book-overlay">
            <button className="quick-view-btn" onClick={() => onClick(book)}>
              Quick Order
            </button>
          </div>
        </div>
        <div className="book-spine"></div>
      </div>
      
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <p className="book-price">₹{book.price}</p>
        {book.description && (
          <p className="book-description">{book.description}</p>
        )}
        {book.genre && (
          <span className="book-genre">{book.genre}</span>
        )}
      </div>
      
      <div className="book-actions">
        <button className="order-btn" onClick={() => onClick(book)}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default BookItem;