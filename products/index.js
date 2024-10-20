//const { default: mongoose } = require("mongoose");

const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');

app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {console.log('Connction to MongoDB establishe')},
    err => {console.log('Failed to connect to MongoDB')}
);

const user = require('./routes/user.routes');

const userProduct = require('./routes/user.product.routes');

app.use('/api/user', user);

app.use('/api/user.product', userProduct)

app.listen(port, () => {
    console.log("Server is up")
});