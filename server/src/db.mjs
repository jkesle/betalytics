import * as mysql from 'mysql';

class QueryResult {
    
}

const connection = mysql.createConnection({
    host: `${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}`,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "betalytics"
});

const db = {
    connect: connection.connect,
    query: connection.query,
    close: connection.end
}

export default db;