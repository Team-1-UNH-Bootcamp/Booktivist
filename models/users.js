const bcrypt = require('bcryptjs');

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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
  User.prototype.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
  };
  User.addHook('beforeCreate', (user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
