'use strict';

require('dotenv').config()
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database');
const port = process.env.PORT || 3000;

const app = express();

//[Get, Delete] hospital by Id
app.route('/api/hospitals/v1/hospitals/:id')
    .get(function(req, res, next) {
        connection.query(
            "SELECT * FROM `hsp_hospitals` WHERE id = ?", req.params.id,
            function(error, results, fields) {
                if (error) return res.status(500).send(error);
                res.json(results);
            }
        );
    })
    .delete(function (req,res) {
        connection.query(
            "DELETE FROM `hsp_hospitals` WHERE id = ?", [req.params.id],
            function(error, results, fields) {
                if (error) return res.status(500).send(error);
                res.send({message: "Registro eliminado exitosamente"});
            }
        );
    })
    ;
//[End][Get, Delete] hospital by Id

//[Get] hospital by region
app.route('/api/hospitals/v1/region/:region')
    .get(function(req, res, next) {
        connection.query(
            "SELECT * FROM `hsp_hospitals` WHERE region = ?", req.params.region,
            function(error, results, fields) {
                if (error) return res.status(500).send(error);
                res.json(results);
            }
        );
    });
//[End][Get] hospital by region

//[Get, Create] all Hospital, Create Hospital
app.route('/api/hospitals/v1/hospitals')
    .get(function (req, res, next) {
        connection.query(
            "SELECT * FROM `hsp_hospitals`",
            function(error, results, fields) {
                if (error) return res.status(500).send(error);
                res.json(results);
            }
        );
    })
    .post(function(req, res, next) {
        console.log('REQ: ',req.body);
        if(!req || !req.body.name || !req.body.code || !req.body.region){
            res.status(400).send({message:"Faltan datos requeridos"});
        }
        connection.query(
            "INSERT INTO `hsp_hospitals` (code, name, region) SET ?",
            req,
            function(error, results, fields) {
                if (error) return res.status(500).send(error);
                res.send({message: "El Hospital se agregó exitosamente"});
            }
        );
    });
//[End][Get] all Hospital, Create Hospital


app.get('/status', (req, res) => res.send('Working!'));

if (module === require.main) {
    // [START server]
    // Start the server
    const server = app.listen(process.env.PORT || 3000, () => {
        const port = server.address().port;
        console.log(`App listening on port ${port}`);
    });
    // [END server]
}
//app.listen(port);

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
* var routes = require('./app/routes/approutes'); //importing route
routes(app); //register the route*/

module.exports = app;