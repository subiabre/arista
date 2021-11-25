const ytsr = require("ytsr");
const {Express} = require("express");
const terminal = require("./terminal");

/**
 * @param {Express} arista
 */
module.exports = { routes: (arista) =>
{
    arista.get('/youtube/*', async (req, res) => {
        const filter = await ytsr.getFilters(req.params[0]);
        const result = await ytsr(filter.get('Type').get('Video').url, {  limit: 15, type: 'video' });

        res.send({ result });
    });
}
};
