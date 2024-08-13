const express = require("express")
const app = express()
const cors = require ('cors')
const api_routes = require("./routes/index")


app.use(express.static('public'))

//Middlewears
app.use(cors())

//poder interpretar los datos que vienen en el body 

app.use(express.json())

//leer datos de un formulario 
app.use(express.urlencoded({extended:true}))

app.use("/api", api_routes)

    module.exports = app

