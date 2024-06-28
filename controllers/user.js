    const { Reservation, Branch, Service, User } = require('../models');
    const sequelize = require('sequelize');
    const { comparePassword } = require('../helpers/bcrypt');
    const { generateToken } = require('../helpers/jwt');

    class UserController {
        static async registerForm(req, res) {
            try {
                if (req.session.token) {
                    return res.redirect('/'); 
                }
                res.render('register', { layout: false, message: ''});
            } catch (err) {
                res.status(500).send(err.message);
            }
        }
        static async loginForm(req, res) {
            try {
                if (req.session.token) {
                    return res.redirect('/'); 
                }
                res.render('login', { layout: false, message: ''});
            } catch (err) {
                res.status(500).send(err.message);
            }
        }
        static async create(req, res, next){
            try {
                const { username, fullname, email, phone, password } = req.body;
                
                const user = await User.create({
                    username,
                    fullname,
                    email,
                    phone: phone.toString(),
                    password
                });

                let payload = {
                    id: user.id,
                    username: user.username
                };
                let token = generateToken(payload);
                req.session.token = token;
    
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
                    if (user.role === 'admin'){
                            res.redirect('/admin')
                        } 
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
                const userId = req.decoded.id;
                const user = await User.findByPk(userId)
                if (user && user.role === 'admin') {
                    return res.redirect('/admin');
                }

                const reservations = await Reservation.findAll({
                    where: { userId },
                    include: [
                    { model: Branch, attributes: ['name'] },
                    { model: Service, attributes: ['nameService', 'price'] }
                    ],
                    order: [['date', 'DESC']]
                });

                const totalReservations = await Reservation.count({ where: { userId } });
                const totalSpend = await Reservation.sum('price', {
                    include: [
                    {
                        model: Service,
                        attributes: [],
                        where: { '$Reservation.userId$': userId }
                    }
                    ]
                });

                res.render('dashboard', { layout:false, user: req.decoded, reservations, 
                    totalReservations, totalSpend
                 });
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
        static async admin(req, res) {
            try {
                const totalBranches = await Branch.count();
                const totalCustomers = await User.count();
                const totalTransactions = await Reservation.count();
                const totalIncome = await Reservation.sum('Service.price', {
                    include: [{ model: Service, attributes: [] }]
                })
                const transactionData = await Reservation.findAll({
                    attributes: [
                        'branchId',
                        [sequelize.fn('COUNT', sequelize.col('branchId')), 'transactionCount']
                    ],
                    group: ['branchId', 'Branch.id', 'Branch.name'],
                    include: [
                        { model: Branch, attributes: ['name'] }
                    ]
                });
                const recentUsers = await User.findAll({
                    order: [['createdAt', 'DESC']],
                    limit: 5 
                });
                
                const reservations = await Reservation.findAll({
                    include: [
                        { model: User, attributes: ['username'] },
                        { model: Branch, attributes: ['name'] },
                        { model: Service, attributes: ['nameService', 'price'] }
                    ],
                    order: [['date', 'DESC'], ['time', 'DESC']]
                });

                res.render('admin', { layout:false, user: req.decoded
                    , totalBranches, totalCustomers, totalIncome, totalTransactions
                    , recentUsers, reservations, transactionData
                 });
            } catch (error) {
                res.status(500).send(error.message);
            }
        }
    }

    module.exports = UserController