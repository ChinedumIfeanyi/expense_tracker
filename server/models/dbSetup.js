import mysql from "mysql"

let dbConnect = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "expense_tracker",
});

dbConnect.connect((err)=>{
	if(err) console.log('Database connection error')
		console.log('Database connected succesfully')
})

export default dbConnect