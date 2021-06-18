module.exports = (app, passport) => {

    const ROUTERNAME = '/authentication';

    app.get(ROUTERNAME + '/', (req, res) => {
        res.render('login/index');
    });

    app.get(ROUTERNAME + '/login', (req, res) => {
        res.render('login/login', {
            message: req.flash('loginMessage')
        });
    });

    app.get(ROUTERNAME + '/signup', (req, res) => {
        res.render('login/signup', {
            message: req.flash('signupMessage')
        });
    });

    app.post(ROUTERNAME + '/login', passport.authenticate('local-login', {
        successRedirect: 'profile',
        failureRedirect: 'login',
        failureFlash: true
    }));

    app.post(ROUTERNAME + '/signup', passport.authenticate('local-signup', {
        successRedirect: 'profile',
        failureRedirect: 'signup',
        failureFlash: true
    }));

    app.get(ROUTERNAME + '/profile', isLoggedIn , (req, res) => {
        res.render('login/profile', {
            user: req.user
        });
    });

    app.get(ROUTERNAME + '/logout', (req, res) => {
        req.logout();
        res.render('login/login', {
            message: req.flash('loginMessage')
        });
    });

    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/authentication');
    }
};
