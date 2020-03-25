const express = require('express'); //importa o modulo empress para a variavel
const cors = require('cors'); // segurança
const routes = require('./routes'); //faz com que o arquivo tenha acesso ao arquivo de rotas

const app = express(); // armazena a aplicação

app.use(cors());
app.use(express.json()); // converte o json da rota, para um objeto javaScript
app.use(routes); //faz com que o arquivo tenha acesso ao arquivo de rotas


app.listen(3333); // porta em que a aplicação estara rodando