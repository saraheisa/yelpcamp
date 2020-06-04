const express          = require('express'),
      partials         = require('express-partials'),
      bodyParser       = require('body-parser'),
      passport         = require('passport'),
      passportLocal    = require('passport-local'),
      app              = express(),
      mongoose         = require('mongoose'),
      User             = require('./models/user'),
      seedDb           = require('./seed');

const commentRouter    = require('./routes/comment'),
      campgroundRouter = require('./routes/campground'),
      indexRouter      = require('./routes/index');

mongoose.connect(`mongodb://SarahGamal:s147852369@ds143293.mlab.com:43293/yelpcampground`);

seedDb();

app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Passport Configuration
app.use(require('express-session')({
    secret: 'pizza over pasta',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass the current user to every request
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use('/', indexRouter);
app.use('/campgrounds', campgroundRouter);
app.use('/campgrounds/:id/comments', commentRouter);

app.get('/', (req, res) => {
    res.render('landing');
});

app.listen(3000, () => {
    console.log('Server started on 3000');
});
