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

app.get('/eventos', async(req, res) => {

    const query = 'SELECT id, nombre, cupo FROM eventos';

    try{
        const [data] = await connection.query(query);
        res.json({
            success: true,
            data
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error al intentar recuperar los registros'
        });
    }

});

app.get( '/eventos/:idEvento', async(req, res) => {

    const {idEvento} = req.params;

    if( isNaN(idEvento) ){
        res.status(400).json({
            success: false,
            message: 'Los datos ingresados son incorrectos'
        })
    }

    const query = 'SELECT id, nombre, cupo FROM eventos WHERE id = ?';

    try{
        const [data] = await connection.query(query, [idEvento]);

        if( data.length > 0 ){
            res.json({
                success: true,
                data: data[0]
            });
        }else{
            res.status(404).json({
                success: false,
                message: 'Este evento no existe'
            })
        }
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error al intentar recuperar el registro'
        });
    }

});

// Middleware para manejar el error 404
app.use((req, res, next) => {
    res.status(404);
    res.send(`
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <a href="/">Volver a la página de inicio</a>
    `);
});