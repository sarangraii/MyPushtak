const express = require('express');
const { getBooks, createOrder } = require('../controllers/bookController');

const router = express.Router();

// GET /api/books - Get all books
router.get('/books', getBooks);

// POST /api/order - Create new order
router.post('/order', createOrder);

module.exports = router;