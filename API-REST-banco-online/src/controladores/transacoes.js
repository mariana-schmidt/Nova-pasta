const { contas, depositos, saques, transferencias } = require('../bancodedados');

const depositarValor = (req, res) => {
    const { numero_conta, valor } = req.body;

    const data = new Date().toLocaleString();

    const indexConta = contas.findIndex(conta => conta.numero === Number(numero_conta));

    contas[indexConta].saldo += valor;

    const novoDeposito = {
        data,
        numero_conta,
        valor
    };

    depositos.push(novoDeposito);

    return res.status(201).send();

};

const sacarValor = (req, res) => {
    const { numero_conta, valor } = req.body;

    const data = new Date().toLocaleString();

    const indexConta = contas.findIndex(conta => conta.numero === Number(numero_conta));

    contas[indexConta].saldo -= valor;

    const novoSaque = {
        data,
        numero_conta,
        valor
    };

    saques.push(novoSaque);

    return res.status(201).send();
};

const transferirValor = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body;
    const data = new Date().toLocaleString();
    const indexContaOrigem = contas.findIndex(conta => conta.numero === Number(numero_conta_origem));
    const indexContaDestino = contas.findIndex(conta => conta.numero === Number(numero_conta_destino));

    contas[indexContaOrigem].saldo -= valor;
    contas[indexContaDestino].saldo += valor;

    const novaTransferencia = {
        data,
        numero_conta_origem,
        numero_conta_destino,
        valor
    };

    transferencias.push(novaTransferencia);

    return res.status(201).send();

};

module.exports = {
    depositarValor,
    sacarValor,
    transferirValor
};