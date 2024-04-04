const mongoose = require('mongoose');

const cafeSchema = new mongoose.Schema({
    titulo : String,
    descripcion : String,
    precio : String,
    prioridad: Number
}); 

const CafeModel = mongoose.model('Cafe', cafeSchema, 'cafes');
module.exports = CafeModel;