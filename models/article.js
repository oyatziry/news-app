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
      models.article.belongsToMany(models.user, { through : "usersArticles" })
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