module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Category.associate = (models) => {
    // Associating Categories with Books
    // When a Category is deleted, also delete any associated Books
    Category.hasMany(models.Book, {
      onDelete: 'cascade',
    });
  };

  return Category;
};
