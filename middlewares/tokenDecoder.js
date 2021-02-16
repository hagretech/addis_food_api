const jwt = require('jsonwebtoken');


function tokenDecoder(token) {
    // check json web token exists & is verified
    if (token) {
        var decoded = jwt.verify(token, 'kiztopia', (err, decodedToken) => {
            if (err) {
                console.log(err)
                return (null)
            } else {

                return (decodedToken.id)
            }
        })
        return (decoded)
    } else {
        return (null)
    }

}

module.exports = tokenDecoder;