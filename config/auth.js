module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            req.flash('error', 'Please login to view this page');
            res.redirect('/users/login');
        }
    }
}