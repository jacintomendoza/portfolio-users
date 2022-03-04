// require the db configuration from the dbConfig file
const dbConfig = require('../config/dbConfig')

// require the sequelize Constructor and Datatypes from sequelize module
const { Sequelize, DataTypes } = require('sequelize')

// construct the sequelize object using the constructor
let sequelize = null;


// console.log("Database_URL: ", process.env.DATABASE_URL)
// export $DATABASE_URL
// echo $DATABASE_URL  

if (process && process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
    );
} else {
    sequelize = new Sequelize(
    { // use imported configurations from dbConfig
        database: dbConfig.DB,
        username: dbConfig.USER,
        password: dbConfig.PASSWORD,
        dialect: dbConfig.dialect,
        host: dbConfig.HOST,
    })
}

// authenticate will test the connection with DB and return a promise
sequelize.authenticate()
    .then(() => { // successfully connected to DB
        console.log("connected to Postgres DB")
    })
    .catch(e => {// failed connecting to DB
        console.log('unable to connect to Postgres DB' + e)
    })



// create a db object to work with the sequelize table
const db = {}

// create an attribute storing the sequelize instance
db.sequelize = sequelize

// get the user model - our table name will be user as set in the following line
db.Users = require('./userModel')(db.sequelize, DataTypes)

// sync the db by running the model
// force: false ensure that the table is not created again on every time the program runs
db.sequelize.sync({ force: false }).then(() => {
    console.log('DB synced with sequelize')
}).catch((error) => {
    console.log('Error syncing the DB to sequelize' + error)
})

module.exports = db