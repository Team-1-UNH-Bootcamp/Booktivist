module.exports = (sequelize, DataTypes) => {
  const BookCategory = sequelize.define('BookCategory', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return BookCategory;
};
