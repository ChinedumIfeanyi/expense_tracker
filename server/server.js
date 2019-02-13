import bodyParser from "body-parser"
import cors from "cors"
import history from "connect-history-api-fallback"
import express from "express"
import path from "path"
import helmet from "helmet"
//====
// Database connection
import dbConnect from "./models/dbSetup"


let app = express()

const PORT = process.env.PORT || 8000

//middleware
app.use(helmet() )
app.use(cors() )
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(history() )

if(process.env.NODE_ENV === 'production'){

	app.use('/', express.static(path.resolve(__dirname, './dist')));	
	app.use('*', express.static(path.resolve(__dirname, './dist')));	

	app.get('*', (req, res) => {
	  res.sendFile(path.resolve(__dirname, './dist/index.html'));
	});

}


app.get("/expense", (req,res)=>{
	const query = `SELECT id, value, reason, date FROM expense`
	dbConnect.query(query, (err,data)=>{
		if(err) res.send(err.message)
		res.status(200).json(data)
	})
})

app.post("/expense", (req,res)=>{
	const query = `
		INSERT INTO expense(value, reason, date) values(?,?,?)
	`	
	dbConnect.query(query,[req.body.inputValue, req.body.reasonForExpense, new Date()], (err,response)=>{
		if(err) console.log(err.message)
		res.status(200).json('data saved')
	})

})

app.get("/expense/:id", (req,res)=>{
	const query = `
		SELECT id, value, reason from expense WHERE id = ?
	`
	dbConnect.query(query, [req.params.id], (err,data)=>{
		if(err) res.json(err.message)
		res.status(200).json(data)
	})
})

app.delete('/expense/:id', (req,res)=>{
	const query = `
		DELETE FROM expense WHERE id = ?
	`
	dbConnect.query(query, [req.params.id], (err,data)=>{
		if(err) res.json(err.message)
			res.status(201).json('deleted')
	})
})


app.use('/', express.static(path.resolve(__dirname, './dist')));	
app.use('*', express.static(path.resolve(__dirname, './dist')));	

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

dbConnect.connect((err)=>{
	if(err){
		console.log('Database connection error')
	}else{
		console.log('Database connected succesfully')
		
		app.listen(PORT, ()=> console.log(`server booted @ ${PORT}`))
	}
})
