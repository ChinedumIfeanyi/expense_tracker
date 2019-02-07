import express from "express"

let app = express()

const PORT = process.env.PORT || 3500

app.get("/", (req,res)=>{
	res.send('server rendering')
})


app.listen(PORT, ()=> console.log(`server booted @ ${PORT}`))