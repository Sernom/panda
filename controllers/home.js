const something = (req, res) => {
    res.send(req.user)
}

module.exports = { something }