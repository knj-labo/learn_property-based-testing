export const validatePassword = (password: string): boolean => {
    return !!password
        && password.length >= 8
        && password.length <= 20
        && !/^[0-9]{8,20}$/.test(password)
        && !/^[a-zA-Z]{8,20}$/.test(password)
        && !/^[!"#$%&'()*+,.\-\/:;<=>?@\[\\\]^_`{|}~]{8,20}$/.test(password);
}