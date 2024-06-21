const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation');
const ReviewController = require('../controllers/review');
const HomeController = require('../controllers/home');
const UserController = require('../controllers/user')
const { authentication } = require('../middlewares/authentication');

router.get('/', HomeController.index)
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).render('error', { message: 'Failed to logout.' });
        }
        res.redirect('/login');
    });
});

router.get('/register', UserController.registerForm)
router.get('/login', UserController.loginForm)
router.post('/register', UserController.create)
router.post('/login', UserController.login)
router.get('/dashboard', authentication, UserController.dashboard)

router.get('/reservation', (req,res) => {
    res.render('reservation')
})
router.post('/reservation/add', ReservationController.create)

router.post('/review', ReviewController.create)

module.exports = router