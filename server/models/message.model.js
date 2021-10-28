'use strict';

function createMessageModel (sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  Post.getAll = async function () {
    return await this.findAll();
  };
  Post.getOne = async function (id) {
    return await this.findOne({where: {id}});
  };
  Post.postOne = async function (post) {
    return await this.create(post);
  };
  Post.deleteOne = async function (id) {
    return await this.destroy({where: {id}});
  };
  Post.vote = async function (id, change) {
    const post = await this.getOne(id);
    return await post.increment('votes', {by: change});

    // return await sequelize.query(`
    //   UPDATE "Posts"
    //   SET votes=votes+${change}
    //   WHERE id=${id}
    //   RETURNING *;`
    // );
  };

  return Post;
}

module.exports = createMessageModel;