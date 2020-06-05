const Comment    = require('../models/comment'),
      Campground = require('../models/campground');

const middlewares = {};

middlewares.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('warning', 'You need to login first!');
    res.redirect('/login');
};

middlewares.isAuthorizedComment = (req, res, next) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, comment) => {
            if (err) {
                req.flash('error', '404 Comment doesn\'t exist!');
                res.redirect('campgrounds');
            } else {
                if (comment.author.id.equals(req.user._id)) {
                    return next();
                }
                req.flash('error', 'You can\'t edit this Comment!');
                res.redirect('back');
            }
        });
    } else {
        req.flash('warning', 'You need to login first!');
        res.redirect('back');
    }
};

middlewares.isAuthorizedCampground = (req, res, next) => {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, campground) => {
            if (err) {
                req.flash('error', '404 Campground doesn\'t exist!');
                res.redirect('campgrounds');
            } else {
                if (campground.author.id.equals(req.user._id)) {
                    return next();
                }
                req.flash('error', 'You can\'t edit this campground!');
                res.redirect('campgrounds/' + req.params.id);
            }
        });
    } else {
        req.flash('warning', 'You need to login first!');
        res.redirect('back');
    }
};

module.exports = middlewares;
