const addr = process.env.HTTP_ADDR || 'http://localhost';
const port = process.env.HTTP_PORT || 7333;

const server = `${addr}:${port}`;

module.exports = {
    /**
     * The HTTP address used by the app
     */
    addr: addr,

    /**
     * The HTTP port used by the app
     */
    port: port,

    /**
     * Get the server address
     * @returns The full HTTP address to the remote side
     */
    getServer: () => server,

    /**
     * Get the server address to the client side of the app
     * @returns The full HTTP address to the client side
     */
    getClient: () => `${server}/client`,

    /**
     * Get the server address to call a youtube query
     * @param {String} query The query to send to youtube
     * @returns The full address to perform a youtube query
     */
    getYoutube: (query) => `${server}/youtube/${query}`
}
