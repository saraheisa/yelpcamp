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
                createdComment.author.id = req.user._id;
                createdComment.author.username = req.user.username;
                createdComment.save();
                campground.comments.push(createdComment);
                campground.save();
                res.redirect('/campgrounds/'+campground._id);
            });
        }
    });
});

router.get('/:comment_id/edit', (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            Comment.findById(req.params.comment_id, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('comment/edit', { comment, campground });
                }
            });
        }
    });
});

router.put('/:comment_id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds/'+req.params.id);
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
