
// require bcryptjs for hashing the password


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

  User.associate = (models) => {
    User.belongsToMany(models.Book, {
      through: 'UserBooks',
      as: 'books',
      foreignKey: 'userId',
      otherKey: 'bookId',
    });
  };
  return User;
};
