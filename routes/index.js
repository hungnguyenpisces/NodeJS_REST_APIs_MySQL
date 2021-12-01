const express = require('express');
const routes = express.Router();
const offices = require('./offices.js');
const employees = require('./employees.js');
const customers = require('./customers.js');
const users = require('./users.js');

routes.use('/offices', offices);
routes.use('/employees', employees);
routes.use('/customers', customers);
routes.use('/users', users);

module.exports = routes;
