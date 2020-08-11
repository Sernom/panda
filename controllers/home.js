const path = require('path')

const comingSoon = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
}

module.exports = { comingSoon }