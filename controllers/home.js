const { Review } = require('../models');

class HomeController{
    static async index(req, res) {
        try {
            // Mengambil 5 review terakhir berdasarkan ID
            const reviews = await Review.findAll({
                order: [['id', 'DESC']], // Mengurutkan berdasarkan ID secara menurun
                limit: 5 // Mengambil hanya 5 data terakhir
            });
            res.render('index', { reviews, user: res.locals.user });
        } catch (err) {
            res.render('error', { error: err.message });//wait for error.ejs
        }
    }
    
}

module.exports = HomeController;