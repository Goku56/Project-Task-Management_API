const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const chalk = require('chalk')
const Config = require('./config')
const routes = require('./routers')
const { PORT, HOST } = Config
const dbConnection = require('./db')



const app = express();
dbConnection()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

//api routes
app.use('/api', routes)

//error handler should be the last the middleware
app.use(require('./helper/error.helper'))

app.listen(PORT, () => {
    console.log(`server is running on port`, chalk.blue(`http://${HOST}:${PORT}`))
}); 