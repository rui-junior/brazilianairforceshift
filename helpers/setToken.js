const jwt = require('jsonwebtoken')

const setToken = async (dadosBD, req, res) => {

    const id = dadosBD.id
    const administrador = dadosBD.administrador

    const token = await jwt.sign(

        {id, administrador},
        'secret',
        { expiresIn: 300 }

    )

    res.cookie('token', token)

    if (administrador) {
        
        res.render('../views/administrador/index.ejs')
        
    } else {
        
        res.render('../views/usuario/index.ejs')

    }

}

module.exports = setToken