const express = require('express');
const session = require('express-session');
const db = require('./models');
const routes = require('./routes');
const passport = require('./config/passport');
const userBooks = require('./routes/userbooks-routes');

// const routes = require('./routes');
// const passport = require('./config/passport');

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/', routes);
app.use('/', userBooks);

app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }),
);
app.use(passport.initialize());
app.use(passport.session());

// Sync sequelize models then start Express app
// =============================================
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
