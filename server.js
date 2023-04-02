const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main-router');
const postRoutes = require('./routes/posts-router');
const commentRoutes = require('./routes/comments-router');
const PORT = process.env.port || 3003;

//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

//Using EJS for views
app.set('view engine', 'ejs');

//Static Folder
app.use(express.static('public'));

//Body Parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Logging
app.use(logger('dev'));

//Use forms for put / delete
app.use(methodOverride('_method'));

//Setup Sessions - stored in MongoDB
app.use(
    session({
        secret: 'keyboard warrior',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, etc...
app.use(flash());

//Setup Routes for which the server is listening
app.use('/', mainRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);

//Connect To Database & Server running

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running')
    });
});
