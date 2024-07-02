const express = require("express")
const app = express()
const cors = require ('cors')

const user_routes = require ("./routes/user.routes")
const product_routes = require("./routes/product.routes")

//Middlewears
app.use(cors())

//poder interpretar los datos que vienen en el body 

app.use(express.json())

app.use("/api", [
    user_routes,
    product_routes

])

    module.exports = app

