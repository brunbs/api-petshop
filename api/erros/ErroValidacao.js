class ErroValidacao extends Error {
    constructor(mensagem) {
        super(mensagem);
        this.name = 'EmailInvalido';
        this.idErro = 4;
    }
}

module.exports = ErroValidacao;