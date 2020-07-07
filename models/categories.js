module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Book, {
      through: 'BookCategory',
      as: 'books',
      foreignKey: 'categoryId',
      otherKey: 'bookId',
    });
  };

  return Category;
};
