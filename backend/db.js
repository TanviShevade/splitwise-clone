import mysql from "mysql2";

let pool;

if (!global.mysqlPool) {
  global.mysqlPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "splitwise",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

pool = global.mysqlPool;

export default pool.promise();
