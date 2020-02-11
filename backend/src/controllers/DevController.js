const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

// index, show, store, update, destroy

module.exports = {
    async index (request, response){
        const devs = await Dev.find();
        return response.json(devs)
    },

    async store (request, response) {
        //desestruturacao (ver mais)
        const {github_username, techs, latitude, longitude} = request.body;
    
        console.log(github_username)
        let dev = await Dev.findOne({ github_username });
        console.log(dev)

        if(!dev){
            const apiresponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const {name = login, avatar_url, bio} = apiresponse.data; //para pegar login se name nao existir name = login
        
            const techsArray = parseStringAsArray(techs) //map para percorrer e trim para remover espaços em brancos antes e depois
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs : techsArray,
                location
            })

            // Filtar as conexões que estão há no máximo 10km de distancia
            // e que o novo dev tenha pelo menos uma das tecnologias filtradas
            const sendSocketMessageTo = findConnections(
                    { latitude, longitude},
                    techsArray   
                )

               sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }
        
        return response.json(dev);
    },

    async update(){ //name, avatar_url, bio, localization, techs

    },

    async destroy(){

    }
}