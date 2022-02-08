const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const { load } = require('./routerhandler');
const { logger } = require('../middlewares/logger');
const { systeminfo } = require('./systeminfo');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.SERVER_PORT;
        // Conectar base de datos
        this.conectarDB();
        // Middlewares
        this.middlewares()
        // Rutas de mi app
        this.routes();
        //  this.listen();
    }
    middlewares() {
        // Protección
        this.app.use(cors())
        // Lectura y Parseo del Body    
        this.app.use(express.json())
        //Directorio Publico
        this.app.use(express.static('public'))
        //Terminal info about requests
        this.app.use(logger)
    }
    async routes() {
        /**
         * Here we will load routes and setup to our webserver
         */
        // Load Routes
        const routes = await load();
        routes.map((element)=>{
            this.app.use(`${element.path}`, require(`${element.route}`));
        });
        this.app.use('/', require('../routes/defaults'));

    }
    async conectarDB() {
        await dbConnection();
    }

    async listen() {
        console.clear();
        this.app.listen(this.port, () => {
            console.log(`${process.env.SERVER_NAME.blue} server running on port`.white, this.port.blue);
        })
        await systeminfo();
    }
}
module.exports = Server;