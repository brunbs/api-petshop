const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');
const ValorNaoSuportado = require('./erros/ValorNaoSuportado');
const ErroValidacao = require('./erros/ErroValidacao');
const formatosAceitos = require('./Serializador').formatosAceitos;
const SerializadorErro = require('./Serializador').SerializadorErro;

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, proximo) => {
    res.set('X-Powered-By', 'Bruno Barbosa');
    res.set('Access-Control-Allow-Origin', '*');
    proximo();
})

app.use((req, res, proximo) => {
    let formatoRequisitado = req.header('Accept');
    if(formatoRequisitado === '*/*') {
        formatoRequisitado = 'application/json';
    }
    if(formatosAceitos.indexOf(formatoRequisitado) === -1) {
        res.status(406).end();
        return;
    }
    res.setHeader('Content-Type', formatoRequisitado);
    proximo();
});

const roteador = require('./rotas/fornecedores');
app.use('/api/fornecedores', roteador);

app.use((erro, req, res, proximo) => {
    let status = 500;
    if(erro instanceof NaoEncontrado) {
        status = 404;
    }
    if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos) {
        status = 400;
    }

    if(erro instanceof ValorNaoSuportado || erro instanceof ErroValidacao) {
        status = 406;
    }

    const Serializador = new SerializadorErro(res.getHeader('Content-Type'));
    res.status(status);
    res.send(
        Serializador.serializar({
            mensagem: erro.message,
            id: erro.idErro
        })
    );
})

app.listen(config.get('api.porta'), () => {
    console.log('A API está funcionando!');
})