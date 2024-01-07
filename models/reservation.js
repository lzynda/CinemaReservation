const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie',
        required: true

    },
    seatNumber: {
        type: Number,
        required: true

    },
    reservationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Reservation', reservationSchema)