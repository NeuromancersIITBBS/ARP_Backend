const  config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const middleware = require('./utils/middleware.js');
const studyResRouter = require('./controllers/studyResources.js');

app.use(cors());
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use('/studyResources/branches',studyResRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
