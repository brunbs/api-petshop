const ValorNaoSuportado = require("./erros/ValorNaoSuportado");

class Serializador {
    json(dados) {
        return JSON.stringify(dados);
    }

    serializar(dados) {
        if(this.contentType === 'application/json') {
            this.json(dados);
        }

        throw new ValorNaoSuportado(this.contentType);
    }
}

module.exports = {
    Serializador: Serializador,
    formatosAceitos: ['application/json']
}