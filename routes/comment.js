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

router.get('/:comment_id/edit', isAuthorized, (req, res) => {
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

router.put('/:comment_id', isAuthorized, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

router.delete('/:comment_id', isAuthorized, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            console.log(err);
            res.redirect('back');
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

function isAuthorized(req, res, next) {
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
}

module.exports = router;
