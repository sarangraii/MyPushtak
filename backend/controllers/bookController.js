// controllers/bookController.js
const Order = require('../models/Order'); // Add this import

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 299,
    image: "https://images-na.ssl-images-amazon.com/images/P/0743273567.01.L.jpg",
    description: "A classic American novel about the Jazz Age",
    genre: "Classic Literature",
    isbn: "978-0743273565"
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 350,
    image: "https://images-na.ssl-images-amazon.com/images/P/0061120081.01.L.jpg",
    description: "A gripping tale of racial injustice and childhood",
    genre: "Classic Literature",
    isbn: "978-0061120084"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: 399,
    image: "https://images-na.ssl-images-amazon.com/images/P/0452284236.01.L.jpg",
    description: "A dystopian social science fiction novel",
    genre: "Science Fiction",
    isbn: "978-0452284234"
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 275,
    image: "https://images-na.ssl-images-amazon.com/images/P/0141439513.01.L.jpg",
    description: "A romantic novel of manners",
    genre: "Romance",
    isbn: "978-0141439518"
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 320,
    image: "https://images-na.ssl-images-amazon.com/images/P/0316769487.01.L.jpg",
    description: "A controversial novel about teenage rebellion",
    genre: "Coming of Age",
    isbn: "978-0316769488"
  },
  {
    id: 6,
    title: "Lord of the Flies",
    author: "William Golding",
    price: 285,
    image: "https://images-na.ssl-images-amazon.com/images/P/0571243398.01.L.jpg",
    description: "A novel about human nature and civilization",
    genre: "Adventure",
    isbn: "978-0571243396"
  },
  {
    id: 7,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    price: 450,
    image: "https://images-na.ssl-images-amazon.com/images/P/0747532699.01.L.jpg",
    description: "The first book in the magical Harry Potter series",
    genre: "Fantasy",
    isbn: "978-0747532699"
  },
  {
    id: 8,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 380,
    image: "https://images-na.ssl-images-amazon.com/images/P/0547928246.01.L.jpg",
    description: "A fantasy adventure about Bilbo Baggins",
    genre: "Fantasy",
    isbn: "978-0547928241"
  },
  {
    id: 9,
    title: "Brave New World",
    author: "Aldous Huxley",
    price: 340,
    image: "https://images-na.ssl-images-amazon.com/images/P/0060850523.01.L.jpg",
    description: "A dystopian novel about a futuristic society",
    genre: "Science Fiction",
    isbn: "978-0060850524"
  },
  {
    id: 10,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 295,
    image: "https://images-na.ssl-images-amazon.com/images/P/0062315005.01.L.jpg",
    description: "A philosophical novel about following your dreams",
    genre: "Philosophy",
    isbn: "978-0062315007"
  }
];

// GET /api/books
const getBooks = (req, res) => {
  try {
    // Simulate API delay
    setTimeout(() => {
      res.json({
        success: true,
        message: 'Books fetched successfully',
        count: books.length,
        data: books
      });
    }, 500);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// POST /api/order - UPDATED TO SAVE TO DATABASE
const createOrder = async (req, res) => {
  try {
    const { bookId, customerName } = req.body;

    // Validation
    if (!bookId || !customerName) {
      return res.status(400).json({
        success: false,
        message: 'Book ID and customer name are required'
      });
    }

    if (typeof customerName !== 'string' || customerName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Customer name must be at least 2 characters long'
      });
    }

    // Find the book
    const book = books.find(b => b.id === parseInt(bookId));
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create and save order to database
    const order = new Order({
      orderId: orderId,
      bookId: book.id.toString(), // Convert to string to match your schema
      customerName: customerName.trim(),
      totalAmount: book.price,
      status: 'confirmed'
    });

    // Save to database
    const savedOrder = await order.save();
    console.log('Order saved to database:', savedOrder);

    // Create response object
    const orderDetails = {
      orderId: savedOrder.orderId,
      bookId: book.id,
      bookTitle: book.title,
      bookAuthor: book.author,
      bookPrice: book.price,
      customerName: savedOrder.customerName,
      orderDate: savedOrder.createdAt,
      status: savedOrder.status,
      deliveryEstimate: '3-5 business days',
      paymentMethod: 'Cash on Delivery'
    };

    // Simulate processing time
    setTimeout(() => {
      res.status(201).json({
        success: true,
        message: `Order placed successfully! Your order ID is ${orderId}`,
        data: orderDetails
      });
    }, 1000);

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = { getBooks, createOrder };