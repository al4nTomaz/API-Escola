import { Request, Response } from 'express';
 
 export const ping = (req: Request, res: Response) => {
     try {
         res.status(200).json({ pong: true });
     } catch (error) {
         console.error('Deu erro ai tio', error);
         res.status(500).json({ error: 'Internal server error' });
     }
 }
 
 export const ehPar = (numero: number) => {
     if (numero % 2 == 0) {
         return true;
     }
     return false;
 }
 
 export const converterParaBinario = (numero: number) => {
     return numero.toString(2);
 }
 
 export const mediaArray = (numeros: number[]) => {
     let res = 0;
     numeros.forEach(element => {
         res += element;
     });
     return res / numeros.length;
 }
 
 export const contarPalavras = (frase: string) => {
     console.log(frase.trim().split(/\s+/).length);
     return frase.trim().split(/\s+/).length;
 }
 
 export const validarCEP = (cep: string) => {
     cep = cep.replace(/\D/g, '');
     var validar = /^[0-9]{8}$/;
 
     console.log(validar.test(cep));
     return validar.test(cep);
 }
 
 export const verificarSenhaForte = (senha: string) => {
     
     let res = false;
     if (senha.length >= 8 && validaNumeroSenha(senha) && validaCaracterEspecialSenha(senha) && validaCaracterSenha(senha)) {
         res = true
     }
 
     return {res, senha};
 }
 
 export const validaNumeroSenha = (senha: string) => {
     for (let i = 0; i < senha.length; i++) {
         if (!isNaN(parseInt(senha[i])) && senha[i] !== ' ') {
             console.log(`O caractere '${senha[i]}' na posição ${i} é um número.`);
             return true;
         }
     }
 
     return false;
 }
 
 
 export const validaCaracterEspecialSenha = (senha: string) => {
     const regexCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/;
 
     if (regexCaracterEspecial.test(senha)) {
         return true;
     } else {
         return false;
     }
 }
 
 export const validaCaracterSenha = (senha: string) => {
     const temMaiuscula = /[A-Z]/.test(senha);
     const temMinuscula = /[a-z]/.test(senha);
 
     if (temMaiuscula && temMinuscula) {
         return true;
     } else {
         return false;
     }
 }