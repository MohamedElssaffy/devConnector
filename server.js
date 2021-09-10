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

app.get('/', (req, res) => res.send('App running'));

app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('App Running');
});
