import dotenv from "dotenv"
dotenv.config()
import bodyParser from "body-parser"
import cors from "cors"

import express from "express"

//====
// Database connection
import dbConnect from "./models/dbSetup"


let app = express()

const PORT = process.env.PORT || 3500

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(cors() )


app.get("/api/all", (req,res)=>{
	const query = `SELECT value, reason, date FROM expense`
	dbConnect.query(query, (err,data)=>{
		if(err) res.send(err.message)
		res.status(200).json(data)
	})
})

app.post("/", (req,res)=>{
	const query = `
		INSERT INTO expense(value, reason, date) values(?,?,?)
	`	
	dbConnect.query(query,["400 euros", "Bought Wine", new Date()], (err,response)=>{
		if(err) console.log(err.message)
		res.send('data saved')
	})

})


app.listen(PORT, ()=> console.log(`server booted @ ${PORT}`))