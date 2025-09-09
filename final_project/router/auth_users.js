const express = require('express');
const jwt = require('jsonwebtoken');
const regd_users = express.Router();
const books = require('./booksdb.js'); // kitaplar

// Tek kullanıcı dizisi
let users = [];

const authenticatedUser = (username, password) => users.some(u => u.username === username && u.password === password);

// Login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Username and password required" });
    if (!authenticatedUser(username,password)) return res.status(401).json({ message: "Invalid username or password" });

    const token = jwt.sign({ username }, 'access_secret_key', { expiresIn: '1h' });
    return res.status(200).json({ message: "User successfully logged in", token });
});

// Add/modify review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ message: "User not logged in" });

    let username;
    try {
        const decoded = jwt.verify(token, "access_secret_key");
        username = decoded.username;
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }

    if (!books[isbn]) return res.status(404).json({ message: "Book not found" });

    if (!books[isbn].reviews) books[isbn].reviews = {};
    books[isbn].reviews[username] = review;

    return res.status(200).json({ message: "Review added/updated", reviews: books[isbn].reviews });
});

// Delete review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ message: "User not logged in" });

    let username;
    try {
        const decoded = jwt.verify(token, "access_secret_key");
        username = decoded.username;
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }

    if (books[isbn] && books[isbn].reviews && books[isbn].reviews[username]) {
        delete books[isbn].reviews[username];
        return res.status(200).json({ message: "Review deleted successfully", reviews: books[isbn].reviews });
    } else {
        return res.status(404).json({ message: "No review found for this user on this book" });
    }
});

module.exports = { regd_users, users };
