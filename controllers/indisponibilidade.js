const schema = require('../db/schema')

exports.indisponibilidade = (req, res) => {

    const { operador, datas } = req.body

    let ano = []
    let mes = []
    let dia = []
    let Dindsp = []
    let { mesBD, anoBD } = ''
    let dataFim = ''

    let arrayIndisp = []

    const verifyData = (datas) => {

        datas.forEach((element, index, array) => {

            const elementitem = element.split('-')
            ano[index] = elementitem[0]
            mes[index] = elementitem[1]
            dia[index] = elementitem[2]

        })

        const comparaMes = mes.every((item, index, array) => {

            if (item == array[0]) {
                return true
            }

            return false

        })

        const comparaAno = ano.every((item, index, array) => {

            if (item == array[0]) {
                return true
            }

            return false

        })

        dataReturn = {

            comparaAno,
            comparaMes,
            ano,
            mes,
            dia

        }

        return dataReturn

    }


    schema.find({}, null, { sort: { legenda: 1 } }, (err, dados) => {

        err ? res.render('../views/administrador/geraescala.ejs', { msg: 'Erro ao consultar o banco' }) : ''

        //inicio de verificacao de preenchimento
        if (!dados) {

            res.render('../views/administrador/geraescala.ejs', { msg: 'Não há Operadores cadastrados' })

        }

        if (typeof (operador) == 'undefined') {

            res.render('../views/administrador/geraescala.ejs', { dados, msg: 'Escolha ao menos 1 operador' })
            return

        }

        if (typeof (operador) == 'object') {

            res.render('../views/administrador/geraescala.ejs', { dados, msg: 'Escolha apenas 1 operador' })
            return

        }

        if (!datas) {

            res.render('../views/administrador/geraescala.ejs', { dados, msg: 'O operador deve ter ao menos 1 dia indisponivel' })
            return

        }

        //comparacao dos dias indisponiveis
        const datasContent = datas.split(', ')
        let dataReturn = []

        if (datasContent.length > 1) {

            dataReturn = verifyData(datasContent)

            if (!dataReturn.comparaAno) {

                res.render('../views/administrador/geraescala.ejs', { dados, msg: 'O ano escolhido deve ser o mesmo' })
                return

            }

            if (!dataReturn.comparaMes) {

                res.render('../views/administrador/geraescala.ejs', { dados, msg: 'O mes escolhido deve ser o mesmo' })
                return

            }

        } else {

            let dataSingle = datas.split('-')
            ano = dataSingle[0]
            mes = dataSingle[1]
            dia = dataSingle[2]

            dataReturn = { ano, mes, dia }

        }

        //faz a adequacao para gravar no banco
        if (typeof (dataReturn.dia) == 'object') {

            for (let i = 0; i < dataReturn.dia.length; i++) {

                Dindsp[i] = dataReturn.dia[i] + '/' + dataReturn.mes[i] + '/' + dataReturn.ano[i]

            }

            dataFim = Dindsp.join(',')

        } else {

            Dindsp = dataReturn.dia + '/' + dataReturn.mes + '/' + dataReturn.ano
            dataFim = Dindsp

        }

        //dataFim

        //verifica se todas as indisponibilidades sao nulas
        dados.forEach((element, index, array) => {

            arrayIndisp.push(element.indisponibilidade)

            if (element.indisponibilidade != '') {

                const dataItem = array[index].indisponibilidade.split(',')
                mesBD = dataItem[0].split('/')[1]
                anoBD = dataItem[0].split('/')[2]

            }

        })


        //se todos sao nulos
        if (arrayIndisp.every((x) => x == '')) {

            return res.redirect(`addindisponibilidade?operador=${operador}&datas=${dataFim}`)
            
        }
        
        //comparacao entre dados do form e do banco

        
        if(typeof(mes) == 'object'){
            
            if(mes[0] == mesBD && ano[0] == anoBD){
                
                return res.redirect(`addindisponibilidade?operador=${operador}&datas=${dataFim}`)
                
            } 
            
            res.render('../views/administrador/geraescala.ejs', { dados, msg: 'O mes e ano deve coicidir com as datas já cadastradas. Exclua as datas cadastradas ou readeque a escolha.'})
            
        }
        
        if(typeof(mes) == 'string') {

            if(mes == mesBD && ano == anoBD){
                
                return res.redirect(`addindisponibilidade?operador=${operador}&datas=${dataFim}`)

            } 

            res.render('../views/administrador/geraescala.ejs', { dados, msg: 'O mes e ano deve coicidir com as datas já cadastradas. Exclua as datas cadastradas ou readeque a escolha.'})

        }

    }).select('-senha')

}



exports.deleta = async (req, res) => {

    const _id = req.params.id

    schema.updateOne({ _id }, { indisponibilidade: '' }, { upsert: true })
    .then(() => {

        return res.redirect('/geraescala')

    })
    .catch((err) => {

        console.log(err)

    })


}

exports.addIndisponibilidade = async (req, res) => {

    const operador = req.query.operador
    const datas = req.query.datas

    schema.findOneAndUpdate({ usuario: operador }, { indisponibilidade: datas }, { upsert: true })
    .then(() => {

        return res.redirect('/geraescala')

    })
    .catch((err) => {

        console.log(err)

    })

}