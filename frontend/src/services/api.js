const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Generic API call function with better error handling
const apiCall = async (url, options = {}) => {
  try {
    console.log(`Making API call to: ${url}`);
    console.log('Request options:', options);
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    // Parse response
    const data = await response.json();
    console.log('Response data:', data);

    // Handle non-200 responses
    if (!response.ok) {
      // If server returns error message, use it
      const errorMessage = data.message || data.error || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;

  } catch (error) {
    console.error('API call failed:', error);
    
    // Handle different types of errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check if the server is running.');
    }
    
    if (error.name === 'SyntaxError') {
      throw new Error('Invalid response from server. Please try again.');
    }
    
    // Re-throw the error with original message
    throw error;
  }
};

// Get all books
export const getBooks = async () => {
  try {
    const response = await apiCall(`${API_BASE_URL}/books`, {
      method: 'GET',
    });
    
    return response;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error(error.message || 'Failed to fetch books');
  }
};

// Create new order
export const createOrder = async (orderData) => {
  try {
    console.log('Creating order with data:', orderData);
    
    // Validate input
    if (!orderData.bookId || !orderData.customerName) {
      throw new Error('Book ID and customer name are required');
    }

    const response = await apiCall(`${API_BASE_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });

    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error(error.message || 'Failed to create order');
  }
};

// Get order by ID (optional - for future use)
export const getOrder = async (orderId) => {
  try {
    const response = await apiCall(`${API_BASE_URL}/order/${orderId}`, {
      method: 'GET',
    });
    
    return response;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error(error.message || 'Failed to fetch order');
  }
};