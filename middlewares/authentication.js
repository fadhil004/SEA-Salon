const jwt = require('../helpers/jwt');

const authentication = (req, res, next) => {
    try {
        let token = req.session.token;

        if (!token) {
            throw { message: 'You should login first!', status: 401 };
        }
        console.log(token)
        let decode = jwt.verifyToken(token);
        req.decoded = decode;
        console.log(decode)
        console.log(req.decoded.id)
        next();
    } catch (err) {
        res.status(401).render('login', { layout:false, message: 'You should login first!' });
    }
};

module.exports = { authentication };
