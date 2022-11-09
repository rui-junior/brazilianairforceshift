const schema = require('../db/schema')

exports.editar = (req, res) => {

    const id = req.query.id
    
    schema.findById({ _id: id}, (err, dados) => {

        if(err){

            res.render('../views/administrador/controleUsuarios.ejs', { msg: 'erro'})

        }

        res.render('../views/administrador/editarusuario.ejs', { dados })

    }).select('-senha')


}

exports.editado = async (req, res) => {

    let {id, usuario, legenda, administrador } = req.body

    administrador == 'on' ? administrador = true : administrador = false    
    
    const dados = await schema.findById({ _id: id })

    if(!usuario){

        res.render('../views/administrador/editarusuario.ejs', { dados, msg: 'Preencha o nome do Operador'})
        return

    }

    if(!legenda){

        res.render('../views/administrador/editarusuario.ejs', { dados, msg: 'Preencha a legenda do Operador'})
        return

    }

    dados.overwrite({ usuario, legenda, administrador })
    
    try {
        
        await dados.save()
        res.redirect('/controleusuarios')
        
    } catch (error) {
        
        res.render('../views/administrador/controleUsuarios.ejs', { msg: 'Erro ao gravar no banco' })
        
    }



}