'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const { body, validationResult } = require('express-validator');
const mongo = require('./utils/mongoConnect');
const { add, get } = require('./controllers/dataController');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/add', [
    body('name')
    .not().isEmpty()
    .withMessage({errorCode: 409000, errorMessage: 'Name should not be empty'})
    .bail(),
    body('count')
    .not().isEmpty()
    .withMessage({errorCode: 409001, errorMessage: 'Count should not be empty'})
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            code: 409,
            message: 'Error',
            errors: errors.array()
        });
    } else {
        add(req, res);
    };
});

app.get('/get', (req, res) => {
    get(req, res);
});

mongo.connectToServer(err => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log('MongoDB connected!');
            console.log('App listening on http://localhost:3001');
        });
    };
});