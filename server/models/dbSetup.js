import mysql from "mysql"

let dbConnect = mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_NAME || 'expense'
});

dbConnect.connect((err)=>{
	if(err){
		console.log('Database connection error')
	}else{
		console.log('Database connected succesfully')
	}
})

export default dbConnect