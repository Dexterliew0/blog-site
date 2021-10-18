const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "https://blog-site-project.netlify.app"],
    credentials: true
}));

app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', commentRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
});