const schema = require('../db/schema')

exports.excluir = async (req, res) => {

    const id = req.params.id

    await schema.deleteOne({ _id: id }).then(function () {

        res.redirect('/controleusuarios')

    }).catch(function (error) {

        res.render('../views/administrador/controleUsuarios.ejs', { msg: 'Problema ao deletar' })
        console.log(error); // Failure

    });



}