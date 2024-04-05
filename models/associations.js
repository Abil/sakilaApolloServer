const Film = require("./film.js");
const Actor = require("./actor.js");
const FilmActor = require("./filmActor.js");

module.exports = associateModels = () => {
  return new Promise((resolve, reject) => {
    //Many to many relationship betwwen flim and actor using a flimActor junction table
    Actor.belongsToMany(Film, {
      through: FilmActor,
      foreignKey: "actor_id",
    });
    Film.belongsToMany(Actor, {
      through: FilmActor,
      foreignKey: "film_id",
    });
    //Needed for lazy loading
    FilmActor.belongsTo(Actor, { foreignKey: "actor_id" });
    FilmActor.belongsTo(Film, { foreignKey: "film_id" });

    // Assuming the associations are successful, resolve the promise
    resolve();

    // If there's an error in setting up associations, reject the promise
    reject(new Error("Failed to set up associations"));
  });
};
