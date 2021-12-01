const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
const { errors } = require('celebrate');

const dbConfig = require('./config/knexfile.js');
const knex = require('knex')(dbConfig.development);
const { Model } = require('objection');
Model.knex(knex);
const { AppError, handleError, handleErrors,} = require('./utils/errorhandle.js');
const routes = require('./routes/index.js');

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(port, function () {
	console.log('Server is runing... http://localhost:' + port);
});

app.use(errors());

app.use(handleErrors);

