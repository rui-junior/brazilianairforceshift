const mongoose = require('mongoose')

const Schema = new mongoose.Schema({

    usuario: {

        type: String,
        require: true

    },

    senha: {

        type: String,
        require: true

    },

    legenda: {

        type: String,
        require: true

    },

    indisponibilidade: {

        type: String,
        require: false

    },

    administrador: {

        type: Boolean,
        require: true

    },
    
})

module.exports = mongoose.model('User', Schema)