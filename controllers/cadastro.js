const schema = require('../db/schema')

exports.cadastro = (req, res) => {

    res.render('../views/cadastro.ejs')

}

exports.cadastrar = async (req, res) => {

    let { usuario, senha, confirmarsenha, legenda, administrador } = req.body
    const indisponibilidade = ''

    if (!usuario || !senha || !confirmarsenha || !legenda) {

        res.render('../views/cadastro.ejs', { msg: 'complete todos os campos' })

    }
    
    if(senha != confirmarsenha){
        
        res.render('../views/cadastro.ejs', { msg: 'A senha precisa ser confirmada' })
        
    }
    
    administrador == 'on' ? administrador = true : administrador = false
    
    try {
        
        const dadosbd = await schema.findOne({ 'usuario': usuario })
        
        if (dadosbd) {
            
            res.render('../views/cadastro.ejs', { msg: 'O Usuário ja existe' })
            return
            
        }
        
    } catch (error) {
        
        res.render('../views/cadastro.ejs', { msg: 'Erro ao conectar ao banco, tente novamente' })
        
    }
    
    const dados = new schema({
        
        usuario: usuario,
        senha: senha,
        legenda: legenda,
        indisponibilidade: indisponibilidade,
        administrador: administrador
        
    })
    
    try {

        await dados.save()
        // res.render('../views/administrador/index.ejs', { msg: 'Usuário Cadastrado' })
        res.redirect('/controleusuarios')
        
    } catch (error) {
        
        res.redirect('/controleusuarios')
        // res.render('../views/cadastro.ejs', { msg: 'Erro ao conectar ao banco, tente novamente' })
        
    }
    
}