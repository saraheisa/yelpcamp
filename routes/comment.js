const express    = require('express'),
      router     = express.Router({ mergeParams: true }),
      Campground = require('../models/campground'),
      Comment    = require('../models/comment');

router.get('/new', isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comment/new', { campground });
        }
    });
});

router.post('/', isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            const comment = req.body.comment;
            Comment.create(comment, (err, createdComment) => {
                campground.comments.push(createdComment);
                campground.save();
                res.redirect('/campgrounds/'+campground._id);
            });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
