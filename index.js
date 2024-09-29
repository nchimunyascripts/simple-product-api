const express = require("express")
const mongoose = require("mongoose")
const rateLimit = require("express-rate-limit")
const productRoute = require('./routes/product.route.js')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
// app.use(express.urlencoded({extented: false}))

const limiter = rateLimit({
    windowsMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
})
app.use('/api', limiter)
app.use('/api/products', productRoute)

mongoose.connect("mongodb://localhost:27017")
.then(() => {
    console.log("Connected");
    app.listen(PORT, () => {
        console.log("Server is running on port: " + PORT);
    })
}).catch(() => {
    console.log("Failed");
})
