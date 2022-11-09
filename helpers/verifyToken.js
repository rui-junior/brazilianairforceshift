
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res) => {

    const token = req.cookies.token

    if(!token){

        res.render('../views/index.ejs')
        return

    }

    await jwt.verify(token, 'secret', (err, decoded) => {

        if(!decoded){

            res.clearCookie('token')
            res.render('../views/index.ejs', { msg: 'Sessão expirada' })
            return
            
        }
        
        if (decoded.administrador) {
            
            res.render('../views/administrador/index.ejs')
            return
            
        } else {
            
            res.render('../views/usuario/index.ejs')
            return

        }


    })

}

module.exports = verifyToken