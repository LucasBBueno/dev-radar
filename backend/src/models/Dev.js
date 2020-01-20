const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

//Definir estrutura do Dev para o mongoose
const DevSchema = mongoose.Schema({
    name : String,
    github_username : String,
    bio : String,
    avatar_url : String,
    techs : [String], //array strings
    location : { //objeto
        type : PointSchema,
        index : '2dsphere' //indice para eixo X e Y
    }
});

module.exports = mongoose.model('Dev', DevSchema);