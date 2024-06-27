const { Reservation, Branch, Service, User } = require('../models');

class ReservationController {
    static async show(req, res){
        try {
            const branches = await Branch.findAll();
            const services = await Service.findAll();
            res.render('reservation', {user: res.locals.user, branches, services });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    static async create(req, res, next){
        try {
            const { name, phone, date, time, branchId, serviceId } = req.body;
            const userId = req.decoded.id;
            
            const branch = await Branch.findByPk(branchId);
            const service = await Service.findByPk(serviceId);

            if (!branch || !service) {
                return res.status(400).send('Invalid branch or service');
              }

            if (isNaN(phone) || phone.toString().length < 14) {
                throw new Error("Invalid phone number");
            }

            await Reservation.create({
                name,
                phone: phone.toString(),
                date,
                time,
                branchId,
                serviceId,
                userId
            });

            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: err.message });
        }
    }
    static async getServices(req, res){
        try {
            const branchId = req.params.branchId;
            const branch = await Branch.findByPk(branchId, {
                include: [{
                    model: Service,
                    as: 'services'
                }]
            });
            
            if (!branch) {
                return res.status(404).json({ error: 'Branch not found' });
            }
    
            res.json(branch.services);
        } catch (error) {
            console.error('Error fetching services:', error);
            res.status(500).json({ error: 'Failed to fetch services' });
        }
    }
}

module.exports = ReservationController;
