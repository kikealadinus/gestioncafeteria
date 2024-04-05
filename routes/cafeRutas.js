const express = require('express');
const rutas = express.Router();
const CafeModel = require('../models/Cafe');

//MODELO LISTAR cafes
rutas.get('/', async (req, res) => {
    try {
        const listacafes = await CafeModel.find();
        //console.log(listacafes);
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

//CONSULTAS
//- Listar todas las tareas con prioridad 5
rutas.get('/cafes-prioridad/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const listacafesprioridad = await CafeModel.find({ prioridad: req.params.id });
        res.json(listacafesprioridad);
    } 
    catch (error) {
        res.status(404).json({mensanje: error.mensaje});
    }
});

//- Ordenar las tareas por prioridad de forma ascendente
rutas.get('/ordenar-cafes', async (req, res) => {
    try {
        console.log(req.params.id);
        const cafeASC = await CafeModel.find().sort({prioridad: 1});
        res.json(cafeASC);
    } 
    catch (error) {
        res.status(404).json({mensanje: error.mensaje});
    }
});

//- Consultar una tarea especifica por Id
rutas.get('/cafes/:id', async (req, res) => {
    try {
        //console.log(req.params.id);
        const cafe = await CafeModel.findById(req.params.id);
        res.json(cafe);
    } 
    catch (error) {
        res.status(404).json({mensanje: error.mensaje});
    }
});
//- Eliminar todas las tareas con una prioridad determinada
rutas.delete('/eliminar-prioridad/:prioridad', async (req, res) => {
    try {
        console.log(req.params.prioridad);
        const prioridad = req.params.prioridad
        const Elimnarcafes = await CafeModel.deleteMany({prioridad});
        res.json({mensaje: 'Cafés eliminados correctamente'})
        //res.json(cafe);
    } 
    catch (error) {
        res.status(404).json({mensanje: error.mensaje});
    }
});

//- Consultar la tarea mas reciente anadida a la base de datos
rutas.get('/cafes-reciente', async (req, res) => {
    try {
        //console.log(req.params.id);
        const cafe = await CafeModel.findOne().sort({_id: -1});
        res.json(cafe);
    } 
    catch (error) {
        res.status(404).json({mensanje: error.mensaje});
    }
});

module.exports = rutas;