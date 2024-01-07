const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateToken = (req, res, next) => {
  //const token = req.header('Authorization')

  const authHeader = req.header('Authorization')


  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({message: 'Odmowa dostępu' })
  }

  const token = authHeader.split(' ')[1]

  const secret = process.env.ACCESS_TOKEN_SECRET 
  jwt.verify(token, secret, (err, user) => {
    if(err){
        return res.status(403).json({message: 'Błędny token' })
    }

    req.user = user
    next()
  })

}

module.exports = authenticateToken