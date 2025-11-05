const express = require('express');

//Instancia de Express.
const app = express();
//Puerto en donde se va a ejecutar el servidor.
const port = 3000;

//Middleware de Express que se encarga de analizar los cuerpos de las peticiones con formato JSON.
app.use(express.json());

//Conexión a la base de datos.
const connection = require('./db');

app.listen(port, () => {
    console.log(`Servidor iniciado en: http://localhost:${port}`);
});

app.get( '/', (req, res) => {
    res.send("Bienvenida/a mi web");
});

app.get('/test', (req, res) => {
    res.send("Ruta de prueba");
});

app.get('/saludo/:nombre', (req, res) => {

    //const nombre = req.params.nombre

    const {nombre} = req.params;

    res.send(`Hola, ${nombre}`);
});

//Rutas de los eventos.
app.use(require('./src/routes/eventoRoutes'));
//Rutas de los usuarios.
app.use(require('./src/routes/usuarioRoutes'));

// Middleware para manejar el error 404
app.use((req, res, next) => {
    res.status(404);
    res.send(`
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <a href="/">Volver a la página de inicio</a>
    `);
});