const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // basic validation
    const allowedDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'empresa.com.br'];
    const domain = email.split('@')[1];

    return emailRegex.test(email) && allowedDomains.includes(domain);
};

const isStrongPassword = (password: string) => {
    // Mínimo 6 caracteres, com ao menos 1 letra, 1 número e 1 caractere especial
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return strongPasswordRegex.test(password);
};

export { isValidEmail, isStrongPassword };