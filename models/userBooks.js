/* eslint-disable linebreak-style */
/* eslint-disable indent */


// require bcryptjs for hashing the password

// eslint-disable-next-line import/no-unresolved
// const bcrypt = require('bcryptjs');

// creating User model

module.exports = (sequelize, DataTypes) => {
    const UserBooks = sequelize.define('UserBooks', {

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },


    });
    return UserBooks;
};
