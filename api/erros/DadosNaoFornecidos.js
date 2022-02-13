class DadosNaoFornecidos extends Error {
    constructor() {
        super('Não foram fornecidos dados para atualizar');
        this.name = 'NaoEncontrado';
        this.idErro = 2;
    }
}

module.exports = DadosNaoFornecidos;