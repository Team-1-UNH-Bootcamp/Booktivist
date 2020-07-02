module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 100] },
    },
    subtitle: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: { len: [5, 100] },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 100] },
    },
    illustrator: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [5, 100] },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [5, 100] },
    },
    description: {
      // may need to allow for more than 255 chars per Ffej
      // could use TEXT data type and put a len cap of 500
      // will need to test in terms of how this would appear on the front-end
      // type: DataTypes.STRING,
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: [5, 500] },
    },
    image__link: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [5, 150] },
    },
    key_talking_points: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isbn: {
      type: DataTypes.INTEGER,
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
      validate: { len: [5, 150] },
    },
    featured: {
      // will be reportable once book is approved by admin and updates to true?
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: { len: [1, 10] },
    },
  });

  Book.associate = (models) => {
    // we're saying that a Book should belong to a Category
    // A Book can't be created without a Category due to the foreign key constraint
    Book.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Book;
};
