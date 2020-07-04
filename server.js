const express = require('express');
const db = require('./models');
const userBooks = require('./routes/userbooks-routes');

// const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// app.use('/', routes);
app.use('/', userBooks);


// Sync sequelize models then start Express app
// =============================================
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
});
