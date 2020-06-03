const express    = require('express'),
      partials   = require('express-partials'),
      bodyParser = require('body-parser'),
      app        = express(),
      mongoose   = require('mongoose'),
      Campground = require('./models/campground'),
      Comment    = require('./models/comment'),
      seedDb     = require('./seed');

mongoose.connect(`mongodb://SarahGamal:s147852369@ds143293.mlab.com:43293/yelpcampground`);

seedDb();

app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));

// Campground.create({
//         name: 'wadi al hytan', 
//         image: 'data:image/jpeg;base64,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'
//     }, (err, campground) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Schema inserted: ');
//             console.log(campground);
//         }
//     }
// );

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/campgrounds', (req, res) => {
    Campground.find((err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campground/index', {campgrounds});
        }
    });
});

app.post('/campgrounds', (req, res) => {
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

app.get('/campgrounds/new', (req, res) => {
    res.render('campground/new');
});

app.get('/campgrounds/:id', (req, res) => {
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

// ================================Comments
app.get('/campgrounds/:id/comments/new', (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comment/new', { campground });
        }
    });
});

app.post('/campgrounds/:id/comments', (req, res) => {
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

app.listen(3000, () => {
    console.log('Server started on 3000');
});
