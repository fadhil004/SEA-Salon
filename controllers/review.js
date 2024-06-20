const { Review } = require('../models');

class ReviewController {
  static async create(req, res, next) {
    try {
      console.log('Request body:', req.body);// tes req.body masuk
      const { reviewName, rate, reviewComments } = req.body;
      await Review.create({
        name: reviewName,
        rating: rate,
        comment: reviewComments
      });
      res.redirect('/'); 
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err.message });
    }
  }
}

module.exports = ReviewController;
