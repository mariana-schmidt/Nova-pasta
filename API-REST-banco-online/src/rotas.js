const express = require('express');
const { listarContas, criarConta, atualizarUsuario, deletarConta, exibirSaldo, exibirExtrato } = require('./controladores/contas');
const { validarSenha, validarConta, verificarURL, validarTransacao, validarSaque, validarTransferencia, validarExibicao } = require('./middlewares');
const { depositarValor, sacarValor, transferirValor } = require('./controladores/transacoes');

const rotas = express();

// Contas
rotas.get('/contas', validarSenha, listarContas);
rotas.post('/contas', validarConta, criarConta);
rotas.put('/contas/:numeroConta', validarConta, verificarURL, atualizarUsuario);
rotas.delete('/contas/:numeroConta', verificarURL, deletarConta);
rotas.get('/contas/saldo', validarExibicao, exibirSaldo);
rotas.get('/contas/extrato', validarExibicao, exibirExtrato);

// Transações
rotas.post('/transacoes/depositar', validarTransacao, depositarValor);
rotas.post('/transacoes/sacar', validarTransacao, validarSaque, sacarValor);
rotas.post('/transacoes/transferir', validarTransferencia, transferirValor);

module.exports = rotas;