const axios = require('axios');

// ----------------------
// Task 10: Get the book list (async/await)
// ----------------------
public_users.get('/async', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5001/');
        res.send(response.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ----------------------
// Task 11: Get book by ISBN (async/await)
// ----------------------
public_users.get('/async/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const response = await axios.get(`http://localhost:5001/isbn/${isbn}`);
        res.send(response.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ----------------------
// Task 12: Get book by Author (async/await)
// ----------------------
public_users.get('/async/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const response = await axios.get(`http://localhost:5001/author/${author}`);
        res.send(response.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ----------------------
// Task 13: Get book by Title (async/await)
// ----------------------
public_users.get('/async/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const response = await axios.get(`http://localhost:5001/title/${title}`);
        res.send(response.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
