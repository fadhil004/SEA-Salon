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
            res.render('branch', { layout:false, user: req.decoded });
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
}

module.exports = DashboardController