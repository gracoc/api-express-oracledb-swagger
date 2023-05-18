const express = require('express');
const cors = require('cors');
const erroHandler = require('../middelwares/errorHandler');
const {swaggerDocs} = require('./swagger');

class ApiServer
{
    
    constructor() 
    {
        this.app = express();
        this.port = process.env.API_PORT;   

        this.authClientePath = '/api/auth';

        this.middlewares();

        this.routes();
    }

    middlewares()
    {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes()
    {
      this.app.use(this.authClientePath, require('../routes/auth'));


     
      this.app.use(erroHandler);
    }

    listen()
    {
        this.app.listen(this.port, () =>{
            console.log('Api rest iniciado, puerto', this.port);
            swaggerDocs(this.app, this.port);
        });
    }
}

module.exports = ApiServer;
