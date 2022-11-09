const mongoose = require('mongoose')

const connection = mongoose.connect('mongodb+srv://ruijr:Mustang1970%23@cluster0.zt73cv9.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((db) => console.log("conectado ao banco"))
    .catch((err) => console.log(err));

module.exports = connection