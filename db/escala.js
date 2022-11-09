const mongoose = require('mongoose')

const Escala = new mongoose.Schema({

    mes: {

        type: String,
        require: true

    }, 
    escala: {

        type: String,
        require: true

    }
    
})

module.exports = mongoose.model('Escala', Escala)