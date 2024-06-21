const { User } = require('../models');

const authorization = async (req, res, next) => {
    try {
      const decodedId = req.decoded.id;
      console.log("test API")
      console.log(decodedId)
      const user = await User.findByPk(decodedId)
      if (user && user.role === 'admin') {
        next();
      } else {
        throw { message: 'Unauthorized access', status: 401 };
      }
    } catch (err) {
      res.status(401).render('login', { layout: false, message: 'Unauthorized access' });
    }
  };
  
  module.exports = { authorization };
  