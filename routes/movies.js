const express = require('express')
const router = express.Router()
const Movie = require('../models/movie')
const authenticateToken = require('../middlewares/authorization')

// Getting all
router.get('/', async (req, res) => {
    try{
      const movies = await Movie.find()
      res.json(movies)
    }
    catch (err)
    {
      res.status(500).json({message: err.message })
    }
  })

// Creating one
router.post('/', authenticateToken, async (req, res) => {
    const movie = new Movie({
      title: req.body.title,
      director: req.body.director,
      date: req.body.date
    })
  
    try{
      const newMovie = await movie.save()
      res.status(201).json(newMovie)
    }
    catch (err){
      res.status(400).json( {message: err.message })
    }
  })

  // Update by id
  router.put('/:id', authenticateToken, getMovie, async (req, res) => {


    if (req.body.title != null){
        res.movie.title = req.body.title
    }

    if(req.body.director != null){
        res.movie.director = req.body.director
    }

    if(req.body.date != null){
        res.mobie.date = req.body.date
    }

    try{
        const updatedMovie = await res.movie.save();
        res.json(updatedMovie)
    } catch (err)
     { res.status(400).json({ message: err.message})}

  })

  // Delete by id
  router.delete('/:id', authenticateToken, getMovie, async (req, res) =>
  {
    try{
        await res.movie.deleteOne()
        res.json({ message: 'Film o podanym id został usunięty' })
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }

  })

  async function getMovie(req, res, next){
    let movie
    try{
        movie = await Movie.findById(req.params.id)
        if(movie == null){
            return res.status(404).json({message: 'Nie ma filmu o takim id'})
        }
    } catch (err){
        return res.status(500).json({ message: err.message })
    }
    res.movie = movie
    next()
  }
  
module.exports = router