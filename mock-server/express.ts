import express from "express"
import {JsonDB} from "node-json-db"
import {Config} from 'node-json-db/dist/lib/JsonDBConfig'
import * as bodyParser from "body-parser";


const app = express()

const db = new JsonDB(new Config("db.json", true, true))

app.use(bodyParser.text({type: "text/plain"}))

app.use(function (req, res, next) {
	req.body = JSON.parse(req.body)
	next()
})

app.use("/", function (req, res, next) {
	try {
		res.setHeader("Access-Control-Allow-Origin", "*")
		next()
	} catch (e) {
		res.statusCode = 500
		res.send({error: "error"})
	}
})

app.post("/api/temperature", function (req, res) {
	const machineId = req.body.machine_id
	const timestamp = req.body.timestamp
	const temperature = req.body.temperature

	const length = db.count(`/temp/${machineId}`)
	if (length === 30) {
		db.delete(`/temp/${machineId}[0]`)
	}
	db.push(`/temp/${machineId}[]`, {timestamp, temp: temperature});
	res.send({success: "submitted successfully"})
})

app.get("/api/temperature", function (req, res) {
	const machineId = req.body.machine_id
	const list = db.getData(`/temp/${machineId}`)
	list.slice(1).slice(-30)
	res.send({temps: list})
})

app.post("/api/lowstockalert", function (req, res) {
	const machineId = req.body.machine_id
	const timestamp = req.body.timestamp
	const stock = req.body.stock
	db.push(`/stock/${machineId}`, {timestamp, stock})
	res.send({success: "submitted successfully"})
})

app.listen(18000, () => {
	console.log("listening on 18000")
})
