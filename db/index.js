const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "moveis.db",
    logging: false, // disable logging
    // global options
    // define: {
    //     freezeTableName: true,
    //     timestamps: false
    // }
});

const db = {
    sequelize, 
    Sequelize,
    models: {}
};

db.models.Movie = require("./models/movie.js")(sequelize);
db.models.Person = require("./models/person.js")(sequelize);

module.exports = db;