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

router.post('/', (req, res) => {
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

router.get('/new', (req, res) => {
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

module.exports = router;
