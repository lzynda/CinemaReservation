const express = require('express')
const router = express.Router()
const Reservation = require('../models/reservation')
const Movie = require("../models/movie")
const authenticateToken = require('../middlewares/authorization')

require('dotenv').config()

// Getting all
router.get('/', async (req, res) => {
  try{
    const reservations = await Reservation.find()
    res.json(reservations)
  }
  catch (err)
  {
    res.status(500).json({message: err.message })
  }
})

// Getting All by movie id
router.get('/:id', async (req, res) => {

    try{
      const movieId = req.params.id

      console.log(movieId)

      const reservations = await Reservation.find({ movie: movieId })
      res.json(reservations)
    }
    catch (err)
    {
        res.status(500).json({message: err.message})
    }

})

// Creating one
router.post('/', authenticateToken, async (req, res) => {
 
  const { movieId, seatNumber, date } = req.body

  try{
  const movie = await Movie.findById(movieId)

  console.log(movie)

  if(!movie){
    res.status(404).json( {message: 'Nie znaleziono filmu' })
  }

  try{
    const seatNumber = req.body.seatNumber
    const movieId = req.body.movieId
    //const reservationExists = await Reservation.find({ seatNumber })

    const reservationExists = await Reservation.find({ 
        $and: [ 
         { seatNumber: seatNumber },
         { movie: movieId }
        ] 
    })

    console.log(movieId)
    const seatCount = process.env.SEAT_COUNT
  
    if(seatNumber < 1 || seatNumber > seatCount){
        return res.status(200).json( {message: 'Miejsce poza zakresem' })
    }
    
    if(reservationExists.length > 0)
    {
        return res.status(200).json( {message: 'Miejsce jest już zarezerwowane' })
    }

    const newReservation = Reservation({movie, seatNumber, date})
    const savedReservation = await newReservation.save()
    res.status(201).json(savedReservation)
  }
  catch (err){
    return res.status(400).json( {message: err.message })
  }
  }
  catch (err){
    res.status(404).json( {message: 'Nie znaleziono filmu' })
  }
})

// Updating One
router.put('/:id', authenticateToken, async (req, res) => {
    
})

// Deleting One
router.delete('/:id', authenticateToken, async (req, res) => {
    
})


module.exports = router