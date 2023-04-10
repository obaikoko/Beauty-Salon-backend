const express = require('express');
// const { cloudinary } = require('./config/cloudinary');
const { errorHandler } = require('./middleware/errorMiddleware');
const colors = require('colors');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');

connectDB();
const app = express();

app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use('/api/products', require('./routes/productRoute'));
app.use('/api/users', require('./routes/userRoute'));
// app.use('/api/images', require('./routes/imageRoute'));

app.use(errorHandler);

app.listen(port, console.log(`Server running on port ${port}`));
