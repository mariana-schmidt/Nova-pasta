const bancodedados = require('./bancodedados');

const contas = bancodedados.contas;

const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória' });
    };

    if (senha_banco !== bancodedados.banco.senha) {
        return res.status(401).json({ mensagem: 'A senha está incorreta' });
    };

    next();
};

const validarConta = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    };

    if (contas.find(conta => conta.usuario.cpf === cpf) || contas.find(conta => conta.usuario.email === email)) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o CPF ou email informado' });
    };

    next();
};

const verificarURL = (req, res, next) => {
    const { numeroConta } = req.params;

    const conta = contas.find(conta => conta.numero === Number(numeroConta));

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    };

    next();

};

const validarTransacao = (req, res, next) => {
    const { numero_conta, valor } = req.body;
    const conta = contas.find(conta => conta.numero === Number(numero_conta));

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'Conta ou valor não informado' });
    };

    if (!conta) {
        return res.status(404).json({ mensagem: 'A conta informada não existe' });
    };

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor informado não é válido' });
    };

    next();

};

const validarSaque = (req, res, next) => {
    const { numero_conta, valor, senha } = req.body;

    const conta = contas.find(conta => conta.numero === Number(numero_conta));

    if (!senha) {
        return res.status(400).json({ mensagem: 'Senha não informada' });
    };

    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'A senha está incorreta' });
    };

    if (conta.saldo < valor) {
        return res.status(403).json({ mensagem: 'Saldo insuficiente' });
    };

    next();
};

const validarTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    const contaOrigem = contas.find(conta => conta.numero === Number(numero_conta_origem));
    const contaDestino = contas.find(conta => conta.numero === Number(numero_conta_destino));

    if (!numero_conta_destino || !numero_conta_origem || !valor) {
        return res.status(400).json({ mensagem: 'Informações insuficientes para realizar a transferência' });
    };

    if (!contaOrigem || !contaDestino) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    };

    if (contaOrigem.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'A senha está incorreta' });
    };

    if (contaOrigem.saldo < valor) {
        return res.status(403).json({ mensagem: 'Saldo insuficiente' });
    };

    next();

};

const validarExibicao = (req, res, next) => {
    const { numero_conta, senha } = req.query;
    const conta = contas.find(conta => conta.numero === Number(numero_conta));

    if (!numero_conta || !senha || !conta) {
        return res.status(400).json({ mensagem: 'Número da conta ou senha inválidos' });
    };

    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: 'A senha está incorreta' });
    };

    next();
};


module.exports = {
    validarSenha,
    validarConta,
    verificarURL,
    validarTransacao,
    validarSaque,
    validarTransferencia,
    validarExibicao
};