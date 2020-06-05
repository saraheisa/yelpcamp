const express     = require('express'),
      router      = express.Router({ mergeParams: true }),
      Campground  = require('../models/campground'),
      Comment     = require('../models/comment'),
      middlewares = require('../middlewares');

router.get('/new', middlewares.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            req.flash('error', '404 Campground doesn\'t exist!');
        } else {
            res.render('comment/new', { campground });
        }
    });
});

router.post('/', middlewares.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            req.flash('error', '404 Campground doesn\'t exist!');
        } else {
            const comment = req.body.comment;
            Comment.create(comment, (err, createdComment) => {
                createdComment.author.id = req.user._id;
                createdComment.author.username = req.user.username;
                createdComment.save();
                campground.comments.push(createdComment);
                campground.save();
                req.flash('success', 'Successfully created your comment!');
                res.redirect('/campgrounds/'+campground._id);
            });
        }
    });
});

router.get('/:comment_id/edit', middlewares.isAuthorizedComment, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            req.flash('error', '404 Campground doesn\'t exist!');
        } else {
            Comment.findById(req.params.comment_id, (err, comment) => {
                if (err) {
                    console.log(err);
                    req.flash('error', '404 Comment doesn\'t exist!');
                } else {
                    res.render('comment/edit', { comment, campground });
                }
            });
        }
    });
});

router.put('/:comment_id', middlewares.isAuthorizedComment, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
        if (err) {
            console.log(err);
            req.flash('error', '404 Comment doesn\'t exist!');
        } else {
            req.flash('success', 'Successfully updated your Comment!');
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

router.delete('/:comment_id', middlewares.isAuthorizedComment, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            console.log(err);
            req.flash('error', '404 Comment doesn\'t exist!');
            res.redirect('back');
        } else {
            req.flash('success', 'Successfully deleted your Comment!');
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

module.exports = router;
