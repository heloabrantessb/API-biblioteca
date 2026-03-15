const express = require('express')
const app = express();
const apiRoutes = require('./routes/Routes.js');

app.use(express.json());
app.use(apiRoutes);

module.exports = app;