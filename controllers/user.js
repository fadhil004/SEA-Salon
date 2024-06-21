    const { User } = require('../models');
    const { comparePassword } = require('../helpers/bcrypt');
    const { generateToken } = require('../helpers/jwt');

    class UserController {
        static async registerForm(req, res) {
            try {
                res.render('register', { layout: false, message: ''});
            } catch (err) {
                res.render('error', { error: err.message });//wait for error.ejs
            }
        }
        static async loginForm(req, res) {
            try {
                res.render('login', { layout: false, message: ''});
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
                res.render('register', { layout: false, message: err.message });
            }
        }
        static async login(req, res, next) {
            try {
                const { username, password } = req.body;
        
                const user = await User.findOne({
                    where: { username }
                });

                if (user && comparePassword(password, user.password)) {
                    let payload = {
                        id: user.id,
                        username: user.username
                    };
                    let token = generateToken(payload);
                    req.session.token = token; 
                    res.redirect('/dashboard');
                } else {
                    res.render('login', { layout: false, message: 'Invalid username or password!' });
                }
            } catch (err) {
                next(err);
            }
        }
        static async dashboard(req, res) {
            try {
                res.render('dashboard', { user: req.decoded });
            } catch (err) {
                res.render('error', { error: err.message });//wait for error.ejs
            }
        }
    }

    module.exports = UserController