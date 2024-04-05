const { ApolloServer } = require("apollo-server");

const sequelize = require("./utils/db.js");
const associateModels = require("./models/associations.js");

const { typeDefs } = require("./typeDefs.js");
const { resolvers } = require("./resolvers.js");

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const initializeApp = async () => {
  console.log("Sakila backend starting up...");
  try {
    // Sequelize Sync
    console.log("//// Initiating Sequelize Sync with MySQL DB ////");
    await sequelize.sync({ alter: false });
    console.log("//// Sequelize Sync Successful with MySQL DB ////");

    // Initialize associations
    await associateModels();
    console.log("//// Model Associations Initialized ////");
  } catch (err) {
    console.error("Error in Sequelize Sync: ", err);
  }

  // Start the server
  server.listen().then(({ url }) => {
    console.log(`🚀 Sakila backend ready at:  ${url}`);
  });
};

initializeApp();
