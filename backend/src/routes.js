const { Router } = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store); //rota raiz da aplicacao

routes.get('/search', SearchController.index);

//exportar routes
module.exports = routes;