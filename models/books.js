module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 100] },
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [0, 100] },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 100] },
    },
    illustrator: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [0, 100] },
    },
    // This field will not be required as it will be a foreign key
    // category: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: { len: [5, 100] },
    // },
    description: {
      // may need to allow for more than 255 chars per Ffej
      // could use TEXT data type and put a len cap of 500
      // will need to test in terms of how this would appear on the front-end
      // type: DataTypes.STRING,
      type: DataTypes.TEXT,
      allowNull: false,
      // validate: { len: [5, 500] },
    },
    image_link: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [5, 150] },
    },
    key_talking_points: {
      type: DataTypes.TEXT,
      allowNull: true,
      // validate: { len: [5, 500] },
    },
    isbn: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: { len: [5, 100] },
    },
    pub_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: { len: [5, 100] },
    },
    youtube_link: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [0, 150] },
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
    added: {
      // will be viewable once book is approved by admin and updates to true?
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  Book.associate = (models) => {
    // we're saying that a Book should belong to a Category
    // A Book can't be created without a Category due to the foreign key constraint
    Book.belongsToMany(models.Category, {
      through: 'BookCategory',
      as: 'categories',
      foreignKey: 'bookId',
      otherKey: 'categoryId',
    });

    Book.belongsToMany(models.User, {
      through: 'UserBooks',
      as: 'users',
      foreignKey: 'bookId',
      otherKey: 'userId',
    });
  };

  return Book;
};
