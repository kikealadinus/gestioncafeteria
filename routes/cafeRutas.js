const express = require('express');
const rutas = express.Router();
const CafeModel = require('../models/Cafe');

//MODELO LISTAR cafes
rutas.get('/', async (req, res) => {
    try {
        const listacafes = await CafeModel.find();
        console.log(listacafes);
        res.json(listacafes);
    } 
    catch (error) {
        res.status(404).json({mensanje: error.mensaje});
    }
});

//MODELO AGREGAR CAFES
rutas.post('/agregar', async (req, res) => {
    const nuevoCafe = new CafeModel({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        prioridad: req.body.prioridad
    });
    try {
        const guardarCafes = await nuevoCafe.save();
        res.status(201).json(guardarCafes);

    } catch (error) {
        res.status(404).json({mensaje: error.mensaje});
    }
});

//MODELO EDITAR CAFES
rutas.put('/editar/:id', async (req, res) => {
    
    try {
        const actualizarCafe = await CafeModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarCafe);

    } catch (error) {
        res.status(404).json({mensaje: error.mensaje});
    }
});

//MODELO ELIMINAR CAFES
rutas.delete('/eliminar/:id', async (req, res) => {
    
    try {
        const eliminarCafe = await CafeModel.findByIdAndDelete(req.params.id, req.body, { new: true});
        //res.status(201).json(eliminarTarea);
        res.json({mensaje: 'Café eliminado correctamente'})

    } catch (error) {
        res.status(404).json({mensaje: error.mensaje});
    }
});

module.exports = rutas;