'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD
=======
      models.article.belongsToMany(models.user, { through : "usersArticles" })
>>>>>>> 43194a04fcf2cf10ed25aac4b85fc2a97a14ad2e
    }
  };
  article.init({
    title: DataTypes.STRING,
    source: DataTypes.STRING,
    date: DataTypes.STRING,
    articleLink: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'article',
  });
  return article;
};