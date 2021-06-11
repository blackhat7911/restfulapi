const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', () => console.log('couldnot connect to db'));
db.once('open', () => console.log(`connection success ${db.collections}`));

const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes);

const studentRoutes = require('./routes/studentRoutes');
app.use('/student', studentRoutes);

app.listen(process.env.PORT)