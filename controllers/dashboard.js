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
            res.render('addBranch', { layout:false, user: req.decoded });
        } catch (err) {
            res.render('error', { error: err.message });//wait for error.ejs
        }
    }
}

module.exports = DashboardController