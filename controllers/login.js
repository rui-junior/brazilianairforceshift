
const schema = require('../db/schema')
const setToken = require('../helpers/setToken')

exports.login = async (req, res) => {

    const {usuario, senha} = req.body

    const dadosBD = await schema.findOne({ usuario })

    if(!dadosBD){

        res.render('../views/index.ejs', { msg: 'O usuario nao existe' })
        return

    }

    if(dadosBD.senha !== senha){

        res.render('../views/index.ejs', { msg: 'A senha está incorreta' })
        return

    }
    
    const token = await setToken(dadosBD, req, res)
    

}

exports.logout = async (req, res) => {

    const token = req.cookies.token

    await res.clearCookie('token')

    res.redirect('/')

}
