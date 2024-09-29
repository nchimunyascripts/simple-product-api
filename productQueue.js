const Bull = require("bull")
const productQueue = new Bull('productQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
})

module.exports = productQueue
