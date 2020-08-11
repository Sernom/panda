const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('panda-auth')
    if (!token) return res.redirect('/auth')

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (e) { res.redirect('/auth')}
}