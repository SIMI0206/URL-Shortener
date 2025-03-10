
export const saveToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
};
