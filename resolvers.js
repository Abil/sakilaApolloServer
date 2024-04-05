const Film = require("./models/film.js");
const Actor = require("./models/actor.js");
const FilmActor = require("./models/filmActor.js");

const resolvers = {
  Query: {
    films: async () => {
      return await Film.findAll({ include: Actor });
    },
    film: async (_, { id }) => {
      return await Film.findByPk(id, { include: Actor });
    },
    actors: async () => {
      return await Actor.findAll({ include: Film });
    },
    actor: async (_, { id }) => {
      return await Actor.findByPk(id, { include: Film });
    },
  },
  Mutation: {
    addFilm: async (
      _,
      {
        title,
        description,
        release_year,
        language_id,
        original_language_id,
        rental_duration,
        rental_rate,
        length,
        replacement_cost,
        rating,
        special_features,
      }
    ) => {
      return await Film.create({
        title,
        description,
        release_year,
        language_id,
        original_language_id,
        rental_duration,
        rental_rate,
        length,
        replacement_cost,
        rating,
        special_features,
      });
    },
    editFilm: async (_, { id, title, description }) => {
      const film = await Film.findByPk(id);
      if (!film) {
        throw new Error("Film not found");
      }
      await film.update({ title, description });
      return film;
    },
    deleteFilm: async (_, { id }) => {
      const film = await Film.findByPk(id);
      if (!film) {
        throw new Error("Film not found");
      }
      await film.destroy();
      return true;
    },
    addActor: async (_, { first_name, last_name }) => {
      return await Actor.create({ first_name, last_name });
    },
    editActor: async (_, { id, first_name, last_name }) => {
      const actor = await Actor.findByPk(id);
      if (!actor) {
        throw new Error("Actor not found");
      }
      await actor.update({ first_name, last_name });
      return actor;
    },
    deleteActor: async (_, { id }) => {
      const actor = await Actor.findByPk(id);
      if (!actor) {
        throw new Error("Actor not found");
      }
      await actor.destroy();
      return true;
    },
    addFilmActor: async (_, { actor_id, film_id }) => {
      try {
        const filmActor = await FilmActor.create({ actor_id, film_id });
        return filmActor;
      } catch (error) {
        console.error("Error creating FilmActor:", error);
        throw new Error("Failed to create FilmActor");
      }
    },
    deleteFilmActor: async (_, { actor_id, film_id }) => {
      try {
        const deletedFilmActor = await FilmActor.destroy({
          where: { actor_id, film_id },
        });
        return deletedFilmActor > 0; // Returns true if a FilmActor was deleted, false otherwise
      } catch (error) {
        console.error("Error deleting FilmActor:", error);
        throw new Error("Failed to delete FilmActor");
      }
    },
  },
};

module.exports = { resolvers };
