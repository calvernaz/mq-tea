var Server = require("./lib/server");

/**
 * Start the MQTT server
 * @param {object} config - The server configuration
 */
exports.startServer = function(config) {
    return new Server({ config: new ConnectionConfig(config) });
};
