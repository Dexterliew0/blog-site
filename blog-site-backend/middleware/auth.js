const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.send('Unauthorized');
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified.user;

        next();

    } catch (err) {
        res.send('Unauthorized');
    }
}

module.exports = auth;