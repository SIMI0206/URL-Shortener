export const generateShortUrl = () => {
    return Math.random().toString(36).substring(2, 8); // Random 6-character string
};
