import mysql from "mysql"

let dbConnect = mysql.createConnection({
	host: process.env.DBHOST || 'localhost',
	user: process.env.DBUSER || 'root',
	password: process.env.DBPASSWORD || '',
	database: process.env.DBNAME || 'expense'
});



export default dbConnect