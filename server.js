const express = require('express');
const session = require('express-session');
// Requiring passport as we've configured it
const flash = require('connect-flash');
const passport = require('./config/passport');

// Requiring database models
const db = require('./models');
// const routes = require('./routes');
const userBooks = require('./routes/userbooks-routes');
const htmlRoutes = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes');
const adminLoginRoutes = require('./routes/adminLogin-routes');
const homePageRoutes = require('./routes/homepage-routes.js');
const categoryPageRoutes = require('./routes/categorypage-routes.js');
const adminReviewRoutes = require('./routes/adminreview-routes');
const addBookRoutes = require('./routes/addbook-routes');

// Setting up port
const PORT = process.env.PORT || 9001;

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    // eslint-disable-next-line comma-dangle
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.errors = req.flash('error');
  next();
});

// middleware for our routes
app.use('/', adminLoginRoutes);
app.use('/api', userBooks);
app.use('/', htmlRoutes);
app.use('/', apiRoutes);
app.use('/', homePageRoutes);
app.use('/api', homePageRoutes);
app.use('/', categoryPageRoutes);
app.use('/api', categoryPageRoutes);
app.use('/', adminReviewRoutes);
app.use('/', addBookRoutes);

// Sync sequelize models then start Express app
// =============================================
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
