export const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    const calcularDigitoVerificador = (baseCpf, posicao) => {
        let soma = 0;
        let multiplicador = posicao + 1;

        for (let i = 0; i < posicao; i++) {
            soma += parseInt(baseCpf.charAt(i)) * multiplicador--;
        }

        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    const primeiroDigito = calcularDigitoVerificador(cpf, 9);

    const baseParaSegundoDigito = cpf.substring(0, 9) + primeiroDigito;
    const segundoDigito = calcularDigitoVerificador(baseParaSegundoDigito, 10);

    return parseInt(cpf.charAt(9)) === primeiroDigito && parseInt(cpf.charAt(10)) === segundoDigito;
};

export const validarSenha = (senha) => {
    const erros = [];
    
    if (senha.length < 8) {
        erros.push("A senha deve ter no mínimo 8 caracteres");
    }
    if (!/[A-Z]/.test(senha)) {
        erros.push("A senha deve conter pelo menos uma letra maiúscula");
    }
    if (!/[0-9]/.test(senha)) {
        erros.push("A senha deve conter pelo menos um número");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        erros.push("A senha deve conter pelo menos um caractere especial");
    }

    return {
        valido: erros.length === 0,
        mensagem: erros.join(" | "),
        erros
    };
};
