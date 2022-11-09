const express = require('express')
const routes = express.Router()

const home = require('../controllers/home')
const login = require('../controllers/login')
const constroleUsuarios = require('../controllers/controleUsuarios')
const cadastro = require('../controllers/cadastro')
const excluir = require('../controllers/excluir')
const editar = require('../controllers/editar')
const geraescala = require('../controllers/geraescala')
const indisponibilidade = require('../controllers/indisponibilidade')

//middle
const verifyToken = require('../helpers/verifyToken')
const verifyAdmin = require('../helpers/verifyAdmin')

routes.get('/', verifyToken, home.home)

routes.post('/login', login.login)
routes.get('/logout', login.logout)

//rotas do admin
routes.get('/controleusuarios',verifyAdmin, constroleUsuarios.controleUsuarios)
routes.get('/cadastro', verifyAdmin, cadastro.cadastro)
routes.post('/cadastrar', verifyAdmin, cadastro.cadastrar)
routes.get('/excluir/:id',verifyAdmin, excluir.excluir)
routes.get('/editar', editar.editar)
routes.post('/editado', editar.editado)
routes.get('/geraescala', geraescala.geraescala)
routes.get('/geraescalajob', geraescala.geraescalafinal)
routes.post('/indisponibilidade', indisponibilidade.indisponibilidade)
routes.get('/deletaindisponibilidade/:id', indisponibilidade.deleta)
routes.get('/addindisponibilidade', indisponibilidade.addIndisponibilidade)

// routes.get('/teste', verifyToken)

module.exports = routes