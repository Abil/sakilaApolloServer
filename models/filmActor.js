const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db.js");

// Define the Language model
const FilmActor = sequelize.define(
  "film_actor",
  {
    actor_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    film_id: {
      type: DataTypes.SMALLINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "film_actor",
    timestamps: false,
  }
);

//Exports
module.exports = FilmActor;
