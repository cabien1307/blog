const express = require('express');
const app = express();
const db = require('./config/db/index')
const route = require('./routes')
const sortMiddleware = require('./middleware/softMiddleware')
const path = require("path");

app.use(express.urlencoded({extended: true}))
app.use("/images", express.static(path.join(__dirname, "/images")));
// Connect DB
db.connect()

app.use(express.json())



// Custom middleware
app.use(sortMiddleware)

// route init
route(app)

app.listen(8080, () => {
    console.log('Server is running at port 8080 !');
})