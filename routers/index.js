const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation');
const ReviewController = require('../controllers/review');
const HomeController = require('../controllers/home');
const UserController = require('../controllers/user')
const DashboardController = require('../controllers/dashboard')
const { authentication } = require('../middlewares/authentication');
const { authorization } = require('../middlewares/authorization');

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
router.get('/admin', authentication, authorization, UserController.admin)

router.get('/admin/service', authentication,authorization, DashboardController.manageService)
router.get('/admin/branch', authentication,authorization, DashboardController.manageBranch)
router.get('/admin/branch/add', authentication,authorization, DashboardController.addBranch)
router.post('/services/create', authentication, authorization, DashboardController.createService)
router.post('/branch/create', authentication, authorization, DashboardController.createBranch)

router.get('/reservation', authentication, ReservationController.show)
router.post('/reservation/add', authentication, ReservationController.create)
router.get('/:branchId/services', authentication, ReservationController.getServices)

router.post('/review', ReviewController.create)

module.exports = router