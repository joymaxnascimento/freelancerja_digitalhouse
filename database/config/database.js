const dados = require('../../database_config.json')

const config = {
    username: dados.username,
    password:dados.password,
    database: dados.database,
    host: dados.host,
    dialect: dados.dialect,
    logging: console.log
}

module.exports = config