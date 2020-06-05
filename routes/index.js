const express    = require('express'),
      router     = express.Router(),
      passport   = require('passport'),
      User       = require('../models/user');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    User.register(new User({ username: req.body.username }),
    req.body.password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            res.render('register');
        } else {
            passport.authenticate('local')(req, res, function(){
                req.flash('success', 'Hello ' + user.username +'!');
                res.redirect('/campgrounds');
            });
        }
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local',
    {
        'successRedirect': '/campgrounds',
        'failureRedirect': '/login'
    }),
    (req, res) => { }
);

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('dark', 'You Logged Out Successfully!');
    res.redirect('/campgrounds');
});

module.exports = router;
