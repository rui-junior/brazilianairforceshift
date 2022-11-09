
const schema = require('../db/schema')

exports.controleUsuarios = async (req, res) => {

    //sort organiza por legenda
    schema.find({}, null, {sort: {legenda: 1}}, (err, dados) => {
    // schema.find((err, dados) => {
        
        if(err){

            res.redirect('/')

        }

        if(dados == null){

            res.render('../views/administrador/controleUsuarios.ejs', { dados })

        }

        res.render('../views/administrador/controleUsuarios.ejs', { dados })

    }).select('-senha')
    
}