const express     = require('express'),
      router      = express.Router(),
      Campground  = require('../models/campground'),
      middlewares = require('../middlewares');;

router.get('/', (req, res) => {
    Campground.find((err, campgrounds) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Something Went Wrong!');
        } else {
            res.render('campground/index', {campgrounds});
        }
    });
});

router.post('/', middlewares.isLoggedIn, (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    };

    const newCampground = { name, price, image, description, author };

    Campground.create(newCampground, (err, campground) => {
        if (err) {
            console.log(err);
            req.flash('error', err.message);
        } else {
            req.flash('success', 'Successfully created a campground');
            res.redirect('/campgrounds');
        }
    });
});

router.get('/new', middlewares.isLoggedIn, (req, res) => {
    res.render('campground/new');
});

router.get('/:id', (req, res) => {
    Campground.findById(req.params.id)
              .populate('comments')
              .exec((err, campground) => {
                    if (err) {
                        console.log(err);
                        req.flash('error', '404 Campground doesn\'t exist!');
                    } else {
                        res.render('campground/show', { campground });
                    }
                });
});

router.get('/:id/edit', middlewares.isAuthorizedCampground, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Something Went Wrong!');
        } else {
            res.render('campground/edit', { campground });
        }
    });
});

router.put('/:id', middlewares.isAuthorizedCampground, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Something Went Wrong!');
        } else {
            req.flash('success', 'Successfully updated ' + updatedCampground.name);
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

router.delete('/:id', middlewares.isAuthorizedCampground, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Something Went Wrong!');
        } else {
            req.flash('success', 'Successfully deleted!');
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;
