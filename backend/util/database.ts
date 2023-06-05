import mysql from 'mysql2';

const config = require('../config/config.json');
export const pool = mysql.createPool({
    port: config.port,
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
}).promise();