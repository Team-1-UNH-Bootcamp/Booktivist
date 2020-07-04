// creating UserBooks model
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
