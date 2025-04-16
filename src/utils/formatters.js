export const formatCPF = (value) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned.replace(/(\d{3})(\d)/, '$1.$2');
    formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2');
    formatted = formatted.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return formatted.substring(0, 14);
};

export const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    let formatted = cleaned;

    if (cleaned.length > 0) {
        formatted = `(${cleaned.substring(0, 2)}`;
    }
    if (cleaned.length > 2) {
        formatted += `) ${cleaned.substring(2, 7)}`;
    }
    if (cleaned.length > 7) {
        formatted += `-${cleaned.substring(7, 11)}`;
    }

    return formatted.substring(0, 15);
};