
const schema = require('../db/schema')
const escala = require('../db/escala')
const fs = require('fs')


exports.geraescala = (req, res) => {

    schema.find({}, null, { sort: { legenda: 1 } }, (err, dados) => {

        err ? res.render('../views/administrador/geraescala.ejs', { msg: 'Erro ao consultar o banco' }) : ''

        if (!dados) {

            res.render('../views/administrador/geraescala.ejs', { msg: 'Não há Operadores cadastrados' })

        }

        res.render('../views/administrador/geraescala.ejs', { dados })


    }).select('-senha')


}



exports.geraescalafinal = (req, res) => {


    // const makeLetters = (letter, exclude = '') => {

    //     if (exclude == '') {

    //         return letter[Math.floor((Math.random() * letter.length))]

    //     }

    //     // se for necessario excluir mais de uma legenda
    //     if (typeof (exclude) == 'object') {

    //         exclude.forEach((element, index, array) => {

    //             letter.splice(letter.indexOf(element), 1)
    //             console.log('array')

    //         })

    //     } else {

    //         letter.splice(letter.indexOf(exclude), 1)
    //         console.log('individual')

    //     }

    //     // return letter[Math.floor((Math.random() * letter.length))]
    //     return letter

    // }

    schema.find({}, null, { sort: { legenda: 1 } }).select('-senha')
        .then((dados) => {

            let escala = []

            const atualMonth = dados[0].indisponibilidade.split(',')[0].split('/')[1]
            const atualYear = dados[0].indisponibilidade.split(',')[0].split('/')[2]
            const daysInAMonth = new Date(atualYear, atualMonth, 0).getDate()

            const isIndisponible = (day, operator = '') => {

                let arrayResult = []
                let dia = []
                let subtitle = []
                let indisponible = []

                // grava a legenda e a indisponibilidade no mesmo indice
                dados.forEach((element, index, array) => {

                    subtitle[index] = element.legenda
                    indisponible[index] = element.indisponibilidade

                    arrayResult.push(subtitle[index])

                    const date = indisponible[index].split(',')

                    if (date.length > 1) {

                        for (let i = 0; i < date.length; i++) {

                            dia[i] = date[i].split('/')[0]

                            if (dia[i] == day) {

                                arrayResult.splice(arrayResult.indexOf(subtitle[index]), 1)

                            }

                        }

                    }

                    if (date.length == 1 & date != '') {

                        dia[0] = date[0].split('/')[0]

                        if (dia[0] == day) {

                            arrayResult.splice(arrayResult.indexOf(subtitle[index]), 1)
                            // console.log(arrayResult.indexOf(subtitle[index]))

                        }

                    }

                })

                if (operator != '') {

                    arrayResult.splice(arrayResult.indexOf(operator), 1)

                }

                return arrayResult

            }

            
            var operadoresturnos = []
            var legendaoperadores = []

            dados.forEach((element, index, array) => {

                operadoresturnos[index] = []
                legendaoperadores[index] = element.legenda
                
            })
            
            
            for (let dia = 1; dia <= daysInAMonth; dia++) {
                
                let operadores = isIndisponible(dia)
                escala[dia] = []

                if (dia > 1) {
                    
                    operadores.splice(operadores.indexOf(escala[dia - 1][2]), 1)

                }
                
                for (let turno = 1; turno < 4; turno++) {
                    
                    let numero = Math.floor(Math.random() * operadores.length)
                    let operador = operadores[numero]
                    operadores.splice(operadores.indexOf(operador), 1)
                    
                    escala[dia].push(operador)      
                    
                }

                dados.forEach((element, index, array) => {
                    
                    if (escala[dia].indexOf(element.legenda) != -1) {

                        // console.log(escala[dia], escala[dia].indexOf(element.legenda), index)
                        operadoresturnos[index].push(escala[dia].indexOf(element.legenda))
                        
                    }

                })
                
            }
            
            res.render('../views/administrador/escala.ejs', { escala, operadoresturnos, legendaoperadores })

        })
        .catch((err) => {

            console.log(err)

        })


}
