const restify = require('restify');
const logger = require('morgan');
const erm = require('express-restify-mongoose');
const mongoose = require('mongoose');
const Chance = require('chance');

const config = require('./config');
const User = require('./app/models/user');

mongoose.connect(config.database);

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(logger('dev'));

var testUserName, testPassword, topSecret, semiSecret;

// sample user setup
server.get('/setup', function(req, res) {

  var chance = new Chance();
  testUserName = chance.first();
  testPassword = chance.string();
  topSecret = chance.string();
  semiSecret = chance.string();

  // create a sample user
  var testUser = new User({
    name: testUserName,
    password: testPassword,
    admin: true,
    topSecret: topSecret,
    semiSecret: semiSecret
  });

  // save the sample user
  testUser.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
});

function printDebug(hookName, req) {
  const debug = '# %s : req.erm object: %s - model available in req.erm.model: %s';
  console.log(debug, hookName, JSON.stringify(req.erm, 0, 2), (req.erm.model) ? true: false);
}

var ermOptions = {
  restify: true,
  private: ['topSecret'],
  protected: ['semiSecret'],
  preMiddleware: function(req, res, next) {
    printDebug('preMiddleware', req);
    next();
  },
  preCreate: function(req, res, next) {
    printDebug('preCreate', req);
    next();
  },
  preRead: function(req, res, next) {
    printDebug('preRead', req);
    next();
  },
  preUpdate: function(req, res, next) {
    printDebug('preUpdate', req);
    next();
  },
  preDelete: function(req, res, next) {
    printDebug('preDelete', req);
    next();
  },
  access: function(req) {
    printDebug('access sync', req);
    return 'public';
    // return 'protected';
    // return 'private';
  },
  // access: function(req, done) {
  // printDebug('access async', req);
  //   done(null, 'public');
  //   done(null, 'protected');
  //   done(null, 'private');
  // },
  contextFilter: function(model, req, done) {
    printDebug('contextFilter', req);
    done(model.find({
      name: testUserName
    }));
  },
  postCreate: function(req, res, next) {
    printDebug('postCreate', req);
    next();
  },
  postRead: function(req, res, next) {
    printDebug('postRead', req);
    next();
  },
  postUpdate: function(req, res, next) {
    printDebug('postUpdate', req);
    next();
  },
  postDelete: function(req, res, next) {
    printDebug('postDelete', req);
    next();
  },
  outputFn: function (req, res) {
    printDebug('outputFn', req);
    return res.json(req.erm.result);
  },
  postProcess: function (req, res, next) {
    printDebug('postProcess', req);
    console.info('%s %s request completed with status code %s',
      req.method, req.path(), req.erm.statusCode);
    next();
  },
  onError: function (err, req, res, next) {
    printDebug('onError', req);
    return res.json({ message: err.message });
  }
};

erm.serve(server, User, ermOptions);

server.listen(config.port, function() {
  console.info('%s listening at %s', server.name, server.url);
});
