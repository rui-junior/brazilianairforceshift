
const jwt = require('jsonwebtoken')

const verifyAdmin = async (req, res, next) => {

    const token = req.cookies.token

    if(token == null || token == 'undefined') {

        res.render('../views/index.ejs', { msg: 'Sessão expirada'})
        
    }
    
    await jwt.verify(token, 'secret', (err, decoded) => {

        if(!decoded){

            res.clearCookie('token')
            res.render('../views/index.ejs', { msg: 'Sessão expirada' })
            return
            
        }
        
        if(!decoded.administrador) {
            
            res.render('../views/usuario/index.ejs')
            return
            
        } else {

            next()

        }

    })

}

module.exports = verifyAdmin