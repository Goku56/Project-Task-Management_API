require('dotenv').config();
const { PORT, DB_HOST, HOST, JWT_SECRET, JWT_EXPIRE } = process.env

const Config = {
    PORT: PORT,
    HOST: HOST,
    DB_HOST: DB_HOST,
    JWT_SECRET: JWT_SECRET,
    JWT_EXPIRE: JWT_EXPIRE
}

module.exports = Config