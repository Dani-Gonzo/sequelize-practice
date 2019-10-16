const db = require("./db");
const {Movie, Person} = db.models;
const {Op} = db.Sequelize;

(async () => {
    // Sync all tables
    await db.sequelize.sync({force: true});
    try {
        // Instance of the Movie class represents a database row
        const movie = await Movie.create({
            title: "",
            runtime: 81,
            releaseDate: "2008-05-02",
            isAvailableOnVHS: true
        });
        // console.log(movie.toJSON());

        //New entry - without logging JSON data to the console
        await Movie.create({
            title: "Avengers",
            runtime: 120,
            releaseDate: "2012-05-04",
            isAvailableOnVHS: false
        });

        await Person.create({
            firstName: "Johnny",
            lastName: "Depp"
        });

        const movie3 = await Movie.build({
            title: "Moana",
            runtime: 105,
            releaseDate: "2016-11-23",
            isAvailableOnVHS: false
        });
        await movie3.save(); // save the record
        // console.log(movie3.toJSON());

        // Finding a deleting a record
        const moana = await Movie.findByPk(3);
        // Delete record
        await moana.destroy();
        // Find and log all movies
        const movies = await Movie.findAll();
        console.log(movies.map(movie => movie.toJSON()));

        // Updating attributes with save()
        // const movieById = await Movie.findByPk(2);
        // movieById.isAvailableOnVHS = true;
        // await movieById.save();
        // console.log(movieById.toJSON());

        // Using update and "whitelisting" attributes
        // const toyStory3 = await Movie.findByPk(3);
        // await toyStory3.update({
        //     title: 'Trinket Tale 3', // this will be ignored
        //     isAvailableOnVHS: true,
        // }, { fields: ['isAvailableOnVHS'] }); 

        // const movieByRuntime = await Movie.findOne({where: {runtime: 105}});
        // console.log(movieByRuntime.toJSON());

        // const movies = await Movie.findAll({ // can use "where" for AND conditions by nesting two or more properties
        //     attributes: ["id", "title"], // return only id and title
        //     where: {
        //         releaseDate: {
        //             [Op.gte]: "2009-01-01" // greater than or equal to the date
        //         },
        //         runtime: {
        //             [Op.gt]: 95 // greater than 95
        //         }
        //         // title: {
        //         //     [Op.endsWith]: "a"
        //         // }
        //     },
        //     order: [["id", "DESC"]] // IDs in descending order
        // });
        // console.log(movies.map(movie => movie.toJSON()));

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
        if (err.name === "SequelizeValidationError") {
            const errors = err.errors.map(err1 => err1.message);
            console.error("Validation errors: ", errors);
        } else {
            throw error;
        }
    }
}) ();