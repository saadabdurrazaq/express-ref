const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const unless = require('express-unless')
const auth = require('./helpers/jwt.js');
const errors = require('./helpers/errorHandler.js')
const env = require("dotenv"); // npm install --save dotenv (CREATING AND CONNECTING TO SERVER)

// Register all the routes
const users = require('./controllers/UserController.js')
const categories = require('./controllers/CategoryController.js')
const products = require('./controllers/ProductController.js')

app.use(cors({origin: "http://localhost:3001"})) // Default = CORS-enabled for all origins Access-Control-Allow-Origin: *!
app.use(express.json()) // middleware for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

// middleware for authenticating token submitted with requests
// All routes are authorized except all the routes below
auth.authenticateToken.unless = unless
app.use(auth.authenticateToken.unless({
    path: [
        { url: '/users/login', methods: ['POST']},
        { url: '/users/register', methods: ['POST']},
        { url: '/categories/get-categories', methods: ['GET']}
    ]
})) 

// middleware for listening to routes
app.use('/users', users)
app.use('/categories', categories)
app.use('/products', products)
// middleware for error responses
app.use(errors.errorHandler);

// MongoDB connection, success and error event responses
const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.vnv8t.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to mongo at ${uri}`));

app.listen(3000);