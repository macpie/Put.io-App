export const getItem = (key) => {
    return localStorage.getItem('putio.' + key);
};

export const setItem = (key, value) => {
    return localStorage.setItem('putio.' + key, value);
};
