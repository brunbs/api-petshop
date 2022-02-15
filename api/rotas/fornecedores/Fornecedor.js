const TabelaFornecedor = require('./TabelaFornecedor');
const CampoInvalido = require('../../erros/CampoInvalido');
const ErroValidacao = require('../../erros/ErroValidacao');
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos');
const Modelo = require('./modeloTabelaFornecedor');

class Fornecedor {
    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id;
        this.empresa = empresa;
        this.email = email;
        this.categoria = categoria;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
    }

    async criar() {
        await this.validar();
        const resultado = TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        });

        this.id = resultado.id;
        this.dataCriacao = resultado.dataCriacao;
        this.dataAtualizacao = resultado.dataAtualizacao;
        this.versao = resultado.versao;
    }

    async carregar() {
        const encontrado = await TabelaFornecedor.pegarPorId(this.id);
        this.empresa = encontrado.empresa;
        this.email = encontrado.email;
        this.categoria = encontrado.categoria;
        this.dataCriacao = encontrado.dataCriacao;
        this.dataAtualizacao = encontrado.dataAtualizacao;
        this.versao = encontrado.versao;
    }

    async atualizar() {
        await TabelaFornecedor.pegarPorId(this.id);
        const campos = ['empresa', 'email', 'categoria'];
        const dadosParaAtualizar = {};
        campos.forEach((campo) => {
            const valor = this[campo];
            if(typeof valor === 'string' && valor.length > 0) {
                dadosParaAtualizar[campo] = valor;            }
        })
        if(Object.keys(dadosParaAtualizar).length === 0) {
            throw new DadosNaoFornecidos();
        }

        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar);
    }

    remover() {
        return TabelaFornecedor.remover(this.id);
    }

    async validar() {
        let modeloFornecedorBuild = Modelo.build({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        });

        let errosDeValidacao = await modeloFornecedorBuild.validate().catch(err => err.errors);

        if(errosDeValidacao.length) {
            throw new ErroValidacao(errosDeValidacao[0].message);
        }
    }

}

module.exports = Fornecedor;