const express    = require('express'),
      router     = express.Router(),
      Campground = require('../models/campground');

router.get('/', (req, res) => {
    Campground.find((err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campground/index', {campgrounds});
        }
    });
});

router.post('/', isLoggedIn, (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    };

    const newCampground = { name, image, description, author };

    Campground.create(newCampground, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

router.get('/new', isLoggedIn, (req, res) => {
    res.render('campground/new');
});

router.get('/:id', (req, res) => {
    Campground.findById(req.params.id)
              .populate('comments')
              .exec((err, campground) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('campground/show', { campground });
                    }
                });
});

router.get('/:id/edit', isAuthorized, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        res.render('campground/edit', { campground });
    });
});

router.put('/:id', isAuthorized, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

router.delete('/:id', isAuthorized, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
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
        Campground.findById(req.params.id, (err, campground) => {
            if (campground.author.id.equals(req.user._id)) {
                return next();
            }
            res.redirect('back');
        });
    } else {
        res.redirect('back');
    }
}

module.exports = router;
