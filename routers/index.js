const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation');
const ReviewController = require('../controllers/review');
const HomeController = require('../controllers/home');

router.get('/', HomeController.index)

router.get('/reservation', (req,res) => {
    res.render('reservation')
})
router.post('/reservation/add', ReservationController.create)

router.post('/review', ReviewController.create)

module.exports = router