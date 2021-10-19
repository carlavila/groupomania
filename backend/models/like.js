'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User, { foreignKey: 'userId' })
      models.Like.belongsTo(models.Post, { foreignKey: 'postId' })
    }
  };
  Like.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  Like.afterCreate(async like => {
    const post = await like.getPost()
    await post.update({
      likesCount: post.like + 1
    })
  })
  Like.afterDestroy(async like => {
    const post = await like.getPost()
    post.update({
      like: post.like - 1
    })
  })

  Like.afterCreate(async like => {
    const post = await like.getPost()
    const user = await like.getUser()

    if(user.id == publication.userId) return

  })
  
  return Like;
};