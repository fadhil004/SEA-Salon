const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation');
const ReviewController = require('../controllers/review');
const HomeController = require('../controllers/home');
const UserController = require('../controllers/user')

router.get('/', HomeController.index)

router.get('/register', UserController.register)
router.get('/login', UserController.login)
router.post('/register', UserController.create)

router.get('/reservation', (req,res) => {
    res.render('reservation')
})
router.post('/reservation/add', ReservationController.create)

router.post('/review', ReviewController.create)

module.exports = router