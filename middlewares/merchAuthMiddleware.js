const jwt = require('jsonwebtoken');


const requireAuth = (req, res, next) => {
    const token = req.cookies.mjwt;
    const token1 = req.cookies.jwt;
    console.log(token)
        // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'kiztopia', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.json({
                    'error': 'please login first'
                })
            } else {
                jwt.verify(token1, 'kiztopia', (err, decodedToken) => {
                    if (err) {
                        console.log(err.message);
                        res.json({
                            'error': 'please login first'
                        })
                    } else {
                        console.log(" merch is authentetecated ")
                        next();
                    }
                });
            }

        })
    } else {
        res.json({
            'error': 'please login first'
        })
    }
};
module.exports = requireAuth