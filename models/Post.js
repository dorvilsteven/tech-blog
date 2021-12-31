const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Post extends Model {

}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        db,
        timestamps: true,
        createdAt: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'Post',
        tableName: 'posts'
    }
);

module.exports = Post;