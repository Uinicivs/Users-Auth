const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/routes')

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', router)

app.listen(8081, () => console.log('servidor rodando'))