const express = require('express');
const router = express.Router();
const FormController = require('../controllers/form');



router.get('/', (req,res) => {
    res.render('index')
})
router.get('/reservation', (req,res) => {
    res.render('reservation')
})

module.exports = router