const jwt = require('jsonwebtoken')


const createJwt = (id) => {
    const maxAge = 3 * 24 * 60 * 60;
    return jwt.sign({ id }, "kiztopia", {
        expiresIn: maxAge
    })
}

module.exports = createJwt;