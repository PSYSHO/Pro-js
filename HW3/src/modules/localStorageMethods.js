export const saveDataToLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getDataFromLS = (key) => {
    const receivedData = localStorage.getItem(key);
    return JSON.parse(receivedData);
}