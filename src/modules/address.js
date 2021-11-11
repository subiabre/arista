const port =  process.env.HTTP_PORT || 7333;
const url = 'http://localhost';

module.exports = {
    port: port,
    url: url,
    get: () => `${url}:${port}`,
    youtube: (query) => `${url}:${port}/youtube/${query}`
}
