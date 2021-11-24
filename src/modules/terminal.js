const UI = require("console-ui");
const chalk = require("chalk");
const output = new UI({
    inputStream: process.stdin,
    outputStream: process.stdout,
    errorStream: process.stderr,
    writeLevel: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR',
    ci: true | false
});

const prefixApp = chalk.bgGreen.white(`[arista]`)
const prefixSockets = chalk.bgMagenta.black(`${prefixApp}[sockets]`);

module.exports = {
    /**
     * The console-ui object instance
     * @type {UI}
     */
    output: output,

    /**
     * Write a new line message
     * @param {String} message 
     * @returns 
     */
    write: (message) => output.writeLine(`${prefixApp}: ${message}`),

    /**
     * Write a new line info message
     * @param {String} message
     * @returns 
     */
    info: (message) => output.writeInfoLine(`${prefixApp}: ${message}`),

    /**
     * Access socket-related log methods
     */
    sockets: {
        /**
         * A new socket connected
         * @param {String} id 
         * @returns 
         */
        new: (id) => output.writeLine(`${prefixSockets}: ${id} connected`),
        out: (id) => output.writeLine(`${prefixSockets}: ${id} disconnected`),
        side: (id, side) => output.writeLine(`${prefixSockets}: ${id} is ${side}`)
    }
};
