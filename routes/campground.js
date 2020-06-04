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
    const newCampground = { name, image, description };

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
                        console.log(campground);
                        res.render('campground/show', { campground });
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
