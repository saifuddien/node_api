import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import database from './utils/db.js'
import multer from 'multer'
import { foodsRouter } from './routers/foods.js'
import { userRouter } from './routers/user.js'

const app = express()
const port = process.env.PORT

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + unique + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({ storage, fileFilter })

database()
app.use(cors())
app.use(bodyParser.json())
app.use('/public', express.static('public'))
app.use(upload.single('poster'))

app.use('/api/menu', foodsRouter)
app.use('/api/auth', userRouter)

app.use('/:any', (req, res) => {
  res.status(404).json({
    code: 404,
    message: req.params.any + ' Not Found'
  })
})

app.use((err, req, res, next) => {
  const code = 500
  const status = err.errorStatus || 'Error'
  const message = err.message

  res.status(code).json({ status, code, message })
})

app.listen(port, () => {
  console.log(`Listening in http://localhost:${port}`)
})