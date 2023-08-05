import mysql from 'mysql2/promise';
import env from './envconfig';

const db = mysql.createPool({
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    database: env.DB_NAME,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
});

export default db;
