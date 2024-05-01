const { contas, saques, depositos, transferencias } = require('../bancodedados');

var numero = 1;

const listarContas = (req, res) => {

    return res.status(200).json(contas);

};

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const novaConta = {
        numero,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };

    contas.push(novaConta);
    numero++;

    return res.status(201).json({ mensagem: 'A conta foi criada com sucesso' });

};

const atualizarUsuario = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;
    const conta = contas.find(conta => conta.numero === Number(numeroConta));

    conta.usuario = {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    };

    return res.send();

};

const deletarConta = (req, res) => {
    const { numeroConta } = req.params;
    const indiceConta = contas.findIndex(conta => conta.numero === Number(numeroConta));

    if (contas[indiceConta].saldo !== 0) {
        return res.status(403).json({ mensagem: 'Não é possível excluir uma conta com saldo superior a 0' });
    };

    contas.splice(indiceConta, 1);

    return res.status(204).send();

};

const exibirSaldo = (req, res) => {
    const { numero_conta } = req.query;
    const conta = contas.find(conta => conta.numero === Number(numero_conta));

    return res.status(200).json({ mensagem: `Seu saldo é de ${conta.saldo}` });

};

const exibirExtrato = (req, res) => {
    const { numero_conta } = req.query;

    const extrato = {
        depositos: depositos.filter(deposito => deposito.numero_conta === numero_conta),
        saques: saques.filter(saque => saque.numero_conta === numero_conta),
        transferenciasEnviadas: transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta),
        transferenciasRecebidas: transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta)
    };

    return res.status(200).json({ extrato });

};

module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    deletarConta,
    exibirSaldo,
    exibirExtrato
};