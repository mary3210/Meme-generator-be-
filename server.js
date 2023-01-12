const express = require("express")
const app = express();
const cors = require('cors')
const morgan = require('morgan')

require("dontenv").config();
require("./config/db.connection")

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


