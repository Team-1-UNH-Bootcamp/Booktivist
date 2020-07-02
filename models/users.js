/* eslint-disable linebreak-style */
/* eslint-disable indent */


// require bcryptjs for hashing the password

// eslint-disable-next-line import/no-unresolved
// const bcrypt = require('bcryptjs');

// creating User model

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 25],
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 25],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5],
            },
        },

    });
    return User;
};
