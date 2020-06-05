const Comment    = require('../models/comment'),
      Campground = require('../models/campground');

const middlewares = {};

middlewares.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

middlewares.isAuthorizedComment = (req, res, next) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, comment) => {
            if (comment.author.id.equals(req.user._id)) {
                return next();
            }
            res.redirect('back');
        });
    } else {
        res.redirect('back');
    }
};

middlewares.isAuthorizedCampground = (req, res, next) => {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, campground) => {
            if (campground.author.id.equals(req.user._id)) {
                return next();
            }
            res.redirect('back');
        });
    } else {
        res.redirect('back');
    }
};

module.exports = middlewares;
