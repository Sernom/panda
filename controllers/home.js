const fs = require('fs')
const something = (req, res) => {
    res.send(fs.readFile(__dirname + "/index.html"))
}

module.exports = { something }