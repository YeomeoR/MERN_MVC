const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');

const port = process.env.PORT;

const eventsRouter = require('./routes/events');
const userRouter = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use((req, res, next) => {
    console.log(req.path, req.method); 
    next();
});


// routes
app.use('/api/events', eventsRouter);
app.use('/api/user', userRouter);

// app.get('/', (req, res) => {
//     res.json({ message: 'Hello World!' });
// })

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Connected to DB and Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
