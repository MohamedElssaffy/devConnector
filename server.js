const path = require('path');
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const usersRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');
const profileRoutes = require('./routes/api/profile');
const postsRoutes = require('./routes/api/posts');

const app = express();

connectDB();

app.use(cors());
app.options(cors());
app.use(express.json({ extended: false }));

app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('App Running');
});
