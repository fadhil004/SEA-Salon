const { Branch, Service, BranchService } = require('../models');

class DashboardController{
    static async manageService(req, res) {
        try {
            res.render('service', { layout:false, user: req.decoded });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    static async manageBranch(req, res) {
        try {
            const branches = await Branch.findAll();
            const services = await Service.findAll();
            const branchServices = await BranchService.findAll({
            include: [Branch, Service],
            });

            res.render('branch', { layout:false, user: req.decoded, branches,
                services,
                branchServices, });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    static async addBranch(req, res) {
        try {
            const services = await Service.findAll();
            res.render('addBranch', { layout:false, user: req.decoded, services });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    static async createService(req,res){
        try {
            const { nameService, price, duration } = req.body;
      
            await Service.create({
              nameService,
              price,
              duration
            });
      
            res.redirect('/admin'); 
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    static async createBranch(req, res) {
        try {
          const { name, location, openingTime, closingTime, services } = req.body;
          const branch = await Branch.create({
            name,
            location,
            openingTime,
            closingTime
          });
    
          if (services && services.length > 0) {
            await branch.setServices(services);
          }
    
          res.redirect('/admin'); 
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    static async addServiceToBranch(req, res){
        const { branchId, serviceId } = req.body;

        try {
            console.log(branchId)
            console.log(serviceId)
            console.log("=====================================")
            const branch = await Branch.findByPk(branchId);
            const service = await Service.findByPk(serviceId);

            if (!branch || !service) {
            return res.status(404).json({ message: 'Branch or service not found' });
            }

            await branch.addService(service);

            res.redirect('/admin/branch');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    static async removeServiceFromBranch(req, res){
        const { branchId, serviceId } = req.params;

        try {
            await BranchService.destroy({
                where: {
                  branchId: branchId,
                  serviceId: serviceId
                }
              });

            res.redirect('/admin/branch');
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

}

module.exports = DashboardController