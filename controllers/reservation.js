const { Reservation, sequelize } = require('../models'); // Ensure correct path

class ReservationController {
    static async create(req, res, next){
        try {
            const { name, phone, date, time, service } = req.body;
            
            // Validation for phone number 
            if (isNaN(phone) || phone.toString().length < 10) {
                throw new Error("Invalid phone number");
            }

            const reservation = await Reservation.create({
                name,
                phone: phone.toString(),
                date,
                time,
                service
            });

            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: err.message });
        }
    }
}

module.exports = ReservationController;
