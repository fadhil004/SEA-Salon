const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

const setUser = async (req, res, next) => {
    try {
        let token = req.session.token;
        if (token) {
            let decoded = verifyToken(token);
            let user = await User.findByPk(decoded.id);
            if (user) {
                req.user = user;
                res.locals.user = user;
            }
        }
        next();
    } catch (err) {
        next();
    }
};

module.exports = setUser;
