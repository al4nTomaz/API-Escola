"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validaCaracterSenha = exports.validaCaracterEspecialSenha = exports.validaNumeroSenha = exports.verificarSenhaForte = exports.validarCEP = exports.contarPalavras = exports.mediaArray = exports.converterParaBinario = exports.ehPar = exports.ping = void 0;
const ping = (req, res) => {
    try {
        res.status(200).json({ pong: true });
    }
    catch (error) {
        console.error('Deu erro ai tio', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.ping = ping;
const ehPar = (numero) => {
    if (numero % 2 == 0) {
        return true;
    }
    return false;
};
exports.ehPar = ehPar;
const converterParaBinario = (numero) => {
    return numero.toString(2);
};
exports.converterParaBinario = converterParaBinario;
const mediaArray = (numeros) => {
    let res = 0;
    numeros.forEach(element => {
        res += element;
    });
    return res / numeros.length;
};
exports.mediaArray = mediaArray;
const contarPalavras = (frase) => {
    console.log(frase.trim().split(/\s+/).length);
    return frase.trim().split(/\s+/).length;
};
exports.contarPalavras = contarPalavras;
const validarCEP = (cep) => {
    cep = cep.replace(/\D/g, '');
    var validar = /^[0-9]{8}$/;
    console.log(validar.test(cep));
    return validar.test(cep);
};
exports.validarCEP = validarCEP;
const verificarSenhaForte = (senha) => {
    let res = false;
    if (senha.length >= 8 && (0, exports.validaNumeroSenha)(senha) && (0, exports.validaCaracterEspecialSenha)(senha) && (0, exports.validaCaracterSenha)(senha)) {
        res = true;
    }
    return { res, senha };
};
exports.verificarSenhaForte = verificarSenhaForte;
const validaNumeroSenha = (senha) => {
    for (let i = 0; i < senha.length; i++) {
        if (!isNaN(parseInt(senha[i])) && senha[i] !== ' ') {
            console.log(`O caractere '${senha[i]}' na posição ${i} é um número.`);
            return true;
        }
    }
    return false;
};
exports.validaNumeroSenha = validaNumeroSenha;
const validaCaracterEspecialSenha = (senha) => {
    const regexCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
    if (regexCaracterEspecial.test(senha)) {
        return true;
    }
    else {
        return false;
    }
};
exports.validaCaracterEspecialSenha = validaCaracterEspecialSenha;
const validaCaracterSenha = (senha) => {
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    if (temMaiuscula && temMinuscula) {
        return true;
    }
    else {
        return false;
    }
};
exports.validaCaracterSenha = validaCaracterSenha;
