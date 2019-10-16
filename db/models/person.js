const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    // Person model
    class Person extends Sequelize.Model {}
    Person.init({
        //Set custome primary key column
        firstName: {
            type: Sequelize.STRING,
            allowNull: false, // disallow null
            validate: {
                notNull: {
                    msg: 'Please provide a value for "firstName"'
                },
                notEmpty: {
                    // custom error message
                    msg: 'Please provide a value for "firstName"'
                }  
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false, // disallow null
            validate: {
                notNull: {
                    msg: 'Please provide a value for "lastName"'
                },
                notEmpty: {
                    // custom error message
                    msg: 'Please provide a value for "lastName"'
                }  
            }
        }
    }, {sequelize});

    return Person;
}