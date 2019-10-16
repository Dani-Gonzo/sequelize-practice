const db = require("./db");
const {Movie} = db.models;

(async () => {
    // Sync all tables
    await db.sequelize.sync({force: true});
    try {
        // Instance of the Movie class represents a database row
        const movie = await Movie.create({
            title: "Iron Man",
            runtime: 81,
            releaseDate: "2008-05-02",
            isAvailableOnVHS: true
        });
        console.log(movie.toJSON());

        //New entry - without logging JSON data to the console
        await Movie.create({
            title: "Avengers",
            runtime: 120,
            releaseDate: "2012-05-04",
            isAvailableOnVHS: false
        });

        // Using Promise.all
        // const movieInstances = await Promise.all([
        //     Movie.create({
        //         title: "Iron Man"
        //     }),
        //     Movie.create({
        //         title: "Avengers"
        //     })
        // ]);
        // const moviesJSON = movieInstances.map(movie => movie.toJSON());
        // console.log(moviesJSON);

    } catch (err) {
        if (error.name === "SequelizeValidationError") {
            const errors = error.errors.map(err => err.message);
            console.error("Validation errors: ", errors);
        } else {
            throw error;
        }
    }
}) ();