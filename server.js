const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static('public'));
app.use(express.json());

// In-memory store for posts
let posts = [];

// Endpoint to get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Endpoint to add a new post
app.post('/api/posts', (req, res) => {
  const { content } = req.body;
  if (content && content.split(' ').length <= 150) {
    posts.push({ content, timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }) });
    res.status(201).json({ message: 'Post created' });
  } else {
    res.status(400).json({ message: 'Post must be 150 words or fewer' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
