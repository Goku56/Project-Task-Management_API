const mongoose = require('mongoose')
const Config = require('../config');
const chalk = require('chalk');
const { DB_HOST } = Config

const dbConnection = () => {
    try {
        mongoose.connect(DB_HOST)
            .then(() => console.log(chalk.blue('Database Connected Successfully...')))
            .catch(err => console.error(chalk.red('Could not connect to MongoDB...', err)))
    } catch (err) {
        console.log(chalk.red('Error connecting to database: ' + err))
    }
}

module.exports = dbConnection
