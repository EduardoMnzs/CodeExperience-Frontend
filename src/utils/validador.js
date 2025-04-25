export const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    const calcularDigitoVerificador = (cpf, posicao) => {
        let soma = 0;
        let multiplicador = posicao + 1;

        for (let i = 0; i < posicao; i++) {
            soma += parseInt(cpf.charAt(i)) * multiplicador--;
        }

        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    const primeiroDigito = calcularDigitoVerificador(cpf, 9);
    const segundoDigito = calcularDigitoVerificador(cpf + primeiroDigito, 10);

    return cpf.charAt(9) == primeiroDigito && cpf.charAt(10) == segundoDigito;
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
