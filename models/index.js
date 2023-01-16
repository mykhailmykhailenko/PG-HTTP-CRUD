const { Client } = require('pg');
const Cat = require('./Cat');
////import all models
const dbConfig = require('../configs/db');

const env = process.env.NODE_ENV || "development";

const client = new Client(dbConfig[env]);
client.connect();

Cat._client = client;
Cat._tableName = 'cats';

module.exports = {
    client,
    Cat
}