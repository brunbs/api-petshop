const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

roteador.get('/', async (req, res) => {
    const resultados = await TabelaFornecedor.listar();
    res.status(200).send(
        JSON.stringify(resultados)
    );
});

roteador.post('/', async (req, res) => {
    const dadosRecebidos = req.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.criar();
    res.status(201).send(
        JSON.stringify(fornecedor)
    );
});

roteador.get('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor;
        fornecedor = new Fornecedor({ id: id });
        await fornecedor.carregar();
        res.status(200).send(JSON.stringify(fornecedor));
    } catch(erro) {
        res.status(400).send(
            JSON.stringify({
                mensagem: erro.message
        }))
    }
});

module.exports = roteador;