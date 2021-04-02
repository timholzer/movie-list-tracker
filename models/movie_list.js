const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Movielist extends Model {}

Movielist.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            type: DataTypes.VARCHAR,
        },
        release_date: {
            type: DataTypes.DATE,
        },
        title: {
            //maybe just varchar?
            type: DataTypes.VARCHAR(1023),
        },
        media_type: {
            type: DataTypes.VARCHAR(1023),
            //see if there is a way to limit the imputs, probably better to do on the frontend
        },
        episodes: {
            type: DataTypes.INTEGER,
        },
        current_episode: {
            type: DataTypes.INTEGER,
        },
        series_is_ongoing: {
            type: DataTypes.BOOLEAN,
        },
        gaming_system: {
            type: DataTypes.VARCHAR(1023),
        },
        author: {
            type: DataTypes.VARCHAR(1023),
        },
        duration_in_minutes: {
            type: DataTypes.INTEGER,
        },
        watch_soon: {
            type: DataTypes.BOOLEAN,
        },
        completed: {
            type: DataTypes.BOOLEAN,
        },
        completion_date: {
            type: DataTypes.DATETIME,
            //datetime now will be in routes?
        },
        user_rating: {
            type: DataTypes.INTEGER,   
        },
        imdb_rating: {
            type: DataTypes.DECIMAL(3,2)
        },
        notes: {
            type: DataTypes.VARCHAR(1023),
        },
        imdb_link: {
            type: DataTypes.VARCHAR(1023),
        },
        watch_link: {
            type: DataTypes.VARCHAR(1023),
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "movies"
    }
);

module.exports = Movielist;