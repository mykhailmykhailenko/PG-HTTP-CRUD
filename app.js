const express = require('express');
const CatController = require('./controllers/Cat.controller');
const bodyParser = express.json();
const app = express();

app.use(bodyParser);

app.post('/', CatController.createCat);
app.get('/', CatController.getAllCats);
app.get('/:catId', CatController.getOneCat);
app.put('/:catId', CatController.updateCat);
app.delete('/:catId', CatController.deleteCat);


module.exports = app;