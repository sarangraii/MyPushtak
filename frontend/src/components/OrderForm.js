import React, { useState } from 'react';
import { createOrder } from '../services/api';

const OrderForm = ({ book, onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!customerName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (customerName.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await createOrder({
        bookId: book.id,
        customerName: customerName.trim()
      });

      setOrderDetails(response.data);
      setSuccess(true);
      
      // Clear form
      setCustomerName('');
      
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setError('');
    setOrderDetails(null);
    setCustomerName('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {success ? 'Order Confirmed!' : 'Place Your Order'}
          </h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {success ? (
          <div className="order-success">
            <div className="success-message">
              <h3>🎉 Order Placed Successfully!</h3>
              <p>Thank you for your order, {orderDetails.customerName}!</p>
            </div>
            
            <div className="order-details">
              <h4>Order Details:</h4>
              <div className="order-info">
                <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                <p><strong>Book:</strong> {orderDetails.bookTitle}</p>
                <p><strong>Author:</strong> {orderDetails.bookAuthor}</p>
                <p><strong>Price:</strong> ₹{orderDetails.bookPrice}</p>
                <p><strong>Status:</strong> <span className="status-badge">{orderDetails.status}</span></p>
                <p><strong>Delivery:</strong> {orderDetails.deliveryEstimate}</p>
              </div>
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleReset}>
                Place Another Order
              </button>
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="book-preview">
              <img src={book.image} alt={book.title} className="preview-image" />
              <div className="preview-info">
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <p className="price">₹{book.price}</p>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="customerName">Your Name:</label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default OrderForm;