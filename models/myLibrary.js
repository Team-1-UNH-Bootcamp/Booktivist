/* eslint-disable linebreak-style */
/* eslint-disable indent */


// require bcryptjs for hashing the password

// eslint-disable-next-line import/no-unresolved
// const bcrypt = require('bcryptjs');

// creating User model

module.exports = (sequelize, DataTypes) => {
    const Library = sequelize.define('Library', {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 25],
            },
        },


    });

    Library.associate = (models) => {
        // library should belong to a User
        // A Library can't be created without a user due to the foreign key constraint
        Library.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };
    Library.associate = (models) => {
        // Library should belong to an Book
        // A library can't be created without a Book due to the foreign key constraint
        Library.belongsTo(models.Book, {
            foreignKey: {
                allowNull: false,
            },
        });
    };
    return Library;
};
