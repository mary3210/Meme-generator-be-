const express = require("express")
const app = express();
const cors = require('cors')
const morgan = require('morgan')

require('dotenv').config();
require("./config/db.connection")

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.get(`/`, async (req, res, next) => {
    try {
        // const allMemes = await meme.find({})
        console.log(`Accessed the home page`)
        // res.status(200).json(allMemes)
    }
    catch(err) {
        console.error(err)
        return next(err)
    }
})

app.get(`/error`, (req, res) => {
    console.error(`Error 500: Internal server error 🚨🚨🚨`)
    res.status(500).send(`Error 500: Internal server error`)
})

app.use((err, req, res, next) => {
    console.error(`🚨 *** Inside error-handling middleware! *** 🚨`)
    if(err) {
        console.log(`Request:`, req)
        console.error(err.message)
        return res.status(404).send(err.message)
    }
    next()
})


app.get(`*`, (req, res, next) => {
    if(req.err) {
        res.status(404).send(`Error: ${req.err.message}`)
    }
    else {
        res.redirect(`/error/`)
    }
})
app.listen(PORT, ()=>console.log(`Listening on port: ${PORT}`))