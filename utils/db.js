import mongoose from 'mongoose'
import 'dotenv/config'

const database = () => {
  return mongoose.connect(process.env.mongodb)
    .then((res) => console.log('connection success : ', res.options.autoIndex))
    .catch(err => console.log('connection failed : ', err))
}

export default database;