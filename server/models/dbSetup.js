import mysql from "mysql"

let dbConnect = mysql.createConnection({
	host: process.env.DATABASE_HOST || 'localhost',
	user: process.env.DATABASE_USER || 'root',
	password: process.env.DATABASE_PASSWORD || '',
	database: process.env.DATABASE_URL || 'expense'
});

dbConnect.connect((err)=>{
	if(err){
		console.log('Database connection error')
	}else{
		console.log('Database connected succesfully')
	}
})

export default dbConnect