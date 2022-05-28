import jsonwebtoken from "jsonwebtoken"
import 'dotenv/config'

export const verifyToken = (req, res, next) => {

  const token = req.header('auth')
  if (!token) {
    return res.status(400).json({
      status: 'Auth Failed!',
      code: 400,
      message: 'No token found'
    })
  }

  try {
    const verified = jsonwebtoken.verify(token, process.env.SECRET_KEY)
    req.auth = verified
    console.log(req.auth)
    next()
  } catch (error) {
    return res.status(400).json({
      status: 'Auth Failed!',
      code: 400,
      message: error
    })
  }
}