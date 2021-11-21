const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression');
const User = require('./models/User');
require('dotenv').config();

// MONGODB
const forceProdDB = false;
const isProdDb = forceProdDB || (process.env.NODE_ENV === 'production' && process.env.REACT_APP_DB_PROD);
const URI = isProdDb ? process.env.REACT_APP_DB_PROD : process.env.REACT_APP_DB_DEV;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auto_reconnect: true,
  reconnectTries: Number.MAX_SAFE_INTEGER,
  reconnectInterval: 1000,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, '*** DB connection error ***'));
db.on('disconnected', console.error.bind(console, '*** DB disconnected ***'));
db.on('reconnected', console.error.bind(console, '*** DB reconnected ***'));
db.once('open', () => {
  console.log('db connection:', isProdDb ? 'prod' : 'dev');
});

// PORT
const PORT = process.env.PORT || 8081;
const app = express();
const server = app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

// MIDDLEWARE
const corsCfg = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};
app.use(cors(corsCfg));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === 'production') {
  app.use(compression());
}

// PASSPORT
app.use(session({
  secret: process.env.REACT_APP_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  // find user based on id stored in cookie
  // save user data to req.user
  User.findById(id)
    .populate('bm.listings')
    .populate('chatrooms')
    .then((user) => {
      done(null, user);
    })
    .catch((e) => {
      done(new Error('Failed to deserialize a user'));
    });
});

// ROUTING
app.use('/api', require('./routes'));

// SOCKET IO
require('./socket').listen(server);

// VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// FORCE HTTPS ON PROD
// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect(`https://${req.get('host')}${req.url}`);
  }
  next();
});

// PROD SERVE FRONTEND
if (process.env.NODE_ENV === 'production') {
  const HALF_HOUR = 1000 * 60 * 30;
  app.use(express.static(path.join(__dirname)));
  app.use(express.static(path.join(__dirname, 'client', 'build'), { maxAge: HALF_HOUR }));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}
else {
  app.use(express.static(path.join(__dirname, 'public')));
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
