const Sequelize = require('sequelize');
const instancia = require('../../banco-de-dados');

const colunas = {
    empresa: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo empresa precisa ser preenchido'
            },
            len: {
                args: [5, 50],
                msg: 'O campo empresa precisa ter entre 5 e 50 caracteres'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O campo email precisa ser preenchido',
            },
            isEmail: {
                msg: 'Email inválido'
            }
        }
    },
    categoria: {
        type: Sequelize.ENUM('ração', 'brinquedos'),
        allowNull: false,
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: 'fornecedores',
    timestamps: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instancia.define('fornecedor', colunas, opcoes);