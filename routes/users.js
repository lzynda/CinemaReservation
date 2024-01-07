const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()

// Creating one
router.post('/', async (req, res) => {
   

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const user = new User({
      login: req.body.login,
      password: hashedPassword 
    })
  
    try{
      const newUser = await user.save()
      res.status(201).json(newUser)
    }
    catch (err){
      res.status(400).json( {message: err.message })
    }
  })


  router.post('/login', async (req, res) => {
      const { login, password } = req.body;

      try{
      const user = await User.findOne({ login })
      
      if(!user){
        return res.status(401).json({message: 'Błąd autoryzacji'})
      }

      
      console.log(password)
      console.log(user.password)
      

      const passwordMatch = await bcrypt.compare(password.trim(), user.password.trim())


      if(!passwordMatch)
      {
        return res.status(401).json({message: 'Błąd autoryzacji'})
      }

      const secret = process.env.ACCESS_TOKEN_SECRET      
      const token = jwt.sign({name: user.login}, secret, { expiresIn: '1d' })

      res.json({token})


    }catch (err){
        return res.status(401).json({message: err.message})
    }

    })
 

  
  module.exports = router