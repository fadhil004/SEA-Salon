const { Reservation, Branch, Service, User } = require('../models');

class ReservationController {
    static async show(req, res){
        try {
            const decodedId = req.decoded.id;
                const user = await User.findByPk(decodedId)
                if (user && user.role === 'admin') {
                    return res.redirect('/admin');
                }
            const branches = await Branch.findAll();
            const services = await Service.findAll();
            res.render('reservation', {user: res.locals.user, branches, services });
        } catch (err) {
            res.status(500).send(err.message);
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
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    static async getBranchTime(req, res){
        try {
            const branch = await Branch.findByPk(req.params.branchId);
            if (!branch) {
                return res.status(404).json({ error: 'Branch not found' });
            }
    
            const openTime = new Date(`1970-01-01T${branch.openingTime}Z`);
            const closeTime = new Date(`1970-01-01T${branch.closingTime}Z`);
            const times = [];
    
            for (let time = new Date(openTime); time <= closeTime; time.setMinutes(time.getMinutes() + 30)) {
                const hours = time.getUTCHours().toString().padStart(2, '0');
                const minutes = time.getUTCMinutes().toString().padStart(2, '0');
                times.push(`${hours}:${minutes}`);
            }
    
            res.json(times);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = ReservationController;
