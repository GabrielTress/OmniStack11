const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');// importação para validações
const OngController = require('./Controllers/OngController');
const IncidentController = require('./Controllers/IncidentController');
const ProfileController = require('./Controllers/ProfileController');
const SessionController = require('./Controllers/SessionController');

const routes = express.Router();  //criaçao da variavel route

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({    //validando a criação de uma nova ONG (BODY(corpo da requisição))
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.post('/sessions', SessionController.create);

routes.post('/incidents', IncidentController.create);

routes.get('/incidents', celebrate({ //verifica se a paginação esta no formato number
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), IncidentController.index);

routes.delete('/incidents/:id', celebrate({ // faz a validação para verificar se esta sendo passado um id como parametro
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), IncidentController.delete);

routes.get('/profile', celebrate({   //  faz a autenticação se existe o ID no cabeçalho da requisição
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

module.exports = routes; //torna a variavel "routes" exportavel para outros arquivos