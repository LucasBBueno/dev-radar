const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://sechomahu:72711551@cluster0-gh7uc.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// principais metodos HTTP: GET, POST, PUT, DELETE
// Tipos de parâmetros:
// Query Params:  req.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recuso na alteração, ou remoção)
// Body: (dados para criação ou alteração de um registro)

app.use(express.json()) //configuração para todas as rotas da aplicação
app.use(routes); //usar rotas

app.listen(3333);