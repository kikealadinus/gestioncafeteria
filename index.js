const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cafesRutas = require('./routes/cafeRutas');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URL;

app.use(express.json());

// Conexión a MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('conexion con MONGODB exitosa');
        app.listen(PORT, () => {console.log(`Servidor fucionando en puerto: ${PORT}`) });
    })

    .catch(error => console.log("Error de conexion con MONGODB", error));

app.use('/ruta-cafes', cafesRutas)