const { Branch, Service } = require('../models');

class DashboardController{
    static async manageService(req, res) {
        try {
            res.render('service', { layout:false, user: req.decoded });
        } catch (err) {
            res.render('error', { error: err.message });//wait for error.ejs
        }
    }
    static async manageBranch(req, res) {
        try {
            const branches = await Branch.findAll({
                include: [{ model: Service, as: 'services' }] // Include associated services
            });
            res.render('branch', { layout:false, user: req.decoded, branches });
        } catch (err) {
            res.render('error', { error: err.message });//wait for error.ejs
        }
    }
    static async addBranch(req, res) {
        try {
            const services = await Service.findAll();
            res.render('addBranch', { layout:false, user: req.decoded, services });
        } catch (err) {
            res.render('error', { error: err.message });//wait for error.ejs
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
        } catch (error) {
            console.error('Error creating service:', error);
            res.status(500).send('Internal Server Error');
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
        } catch (error) {
          console.error('Error creating branch:', error);
          res.status(500).send('Internal Server Error');
        }
    }
    static async getServices(req, res) {
        try {
            const services = await Service.findAll();
            res.json(services);
        } catch (error) {
            console.error('Error fetching services:', error);
            res.status(500).json({ error: 'Failed to fetch services' });
        }
    }
    static async getServicesByBranchId(req, res) {
        try {
            const branchId = req.params.branchId;
            
            const services = await Service.findAll({
              include: [{
                model: Branch,
                where: { id: branchId }
              }]
            });
        
            res.json(services);
          } catch (error) {
            console.error('Error fetching branch services:', error);
            res.status(500).json({ error: 'Failed to fetch branch services' });
          }
        
    }
    static async removeServicesFromBranch(req, res) {
        const { branchId } = req.params;
        const { services } = req.body;
        try {
            const branch = await Branch.findByPk(branchId);
            if (!branch) {
            return res.status(404).json({ error: 'Branch not found' });
            }

            // Menghapus layanan dari cabang
            await branch.removeServices(services);

            res.status(200).json({ message: 'Services removed from branch successfully' });
        } catch (error) {
            console.error('Error removing services from branch:', error);
            res.status(500).json({ error: 'Failed to remove services from branch' });
        }
    }
}

module.exports = DashboardController