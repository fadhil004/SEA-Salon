const { User } = require('../models');

class UserController {
    static async register(req, res) {
        try {
            res.render('register', { layout: false});
        } catch (err) {
            res.render('error', { error: err.message });//wait for error.ejs
        }
    }
    static async login(req, res) {
        try {
            res.render('login', { layout: false});
        } catch (err) {
            res.render('error', { error: err.message });//wait for error.ejs
        }
    }
    static async create(req, res, next){
        try {
            const { username, fullname, email, phone, password } = req.body;
            
            await User.create({
                username,
                fullname,
                email,
                phone: phone.toString(),
                password
            });

            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: err.message });
        }
    }
}

module.exports = UserController