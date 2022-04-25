import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import database from './utils/db.js'
import { foodsRouter } from './routers/foods.js'

const app = express()
const port = process.env.PORT

database()
app.use(cors())
app.use(bodyParser.json())
app.use('/public', express.static('public'))

app.use('/api/menu', foodsRouter)

app.use('/:any', (req, res) => {
  res.status(404).json({
    code: 404,
    message: req.params.any + ' Not Found'
  })
})

app.listen(port, () => {
  console.log(`Listening in http://localhost:${port}`)
})