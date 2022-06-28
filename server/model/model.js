const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    tipo : String,
    endereco : String, 
    telefone : String,
    data_compromisso : String,
    hora_compromisso: String
})

const Compromissodb = mongoose.model('compromissodb', schema);

module.exports = Compromissodb;