const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response){
    // Buscar todos devs num raio 10km
    // Filtrar por tecnologias
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({ //passa um objeto para ter filtros
        techs: {
            $in: techsArray //usou objeto para fazer filtro
        },
        location: {
            $near: {
                $geometry: {
                    type : 'Point',
                    coordinates: [longitude, latitude]
                },
                $maxDistance: 10000 //10 km
            }
        }
    })

    return response.json({ devs })
    }
}