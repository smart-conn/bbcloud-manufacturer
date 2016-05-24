var ManufacturerAccount = require('../models/manufacturer-account');
var router = require('express').Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var nconf = require('nconf');
var jwt = require('jsonwebtoken');

var secret = nconf.get('secret');

passport.use(new LocalStrategy(ManufacturerAccount.authenticate()));

router.post('/auth/manufacturer/sign-up', signUp);
router.post('/auth/manufacturer/sign-in', passport.authenticate('local', {session: false}), signIn);

function signIn(req, res, next) {
  var customerId = req.user._id;

  jwt.sign({realm: 'customer'}, secret, {subject: customerId}, function(err, token) {
    res.json({token});
  });
}

function signUp(req, res, next) {
  console.log(req.body);
  var username = req.body.mobilePhoneNumber;
  var password = req.body.password;
  console.log(username);
  console.log(password);

  ManufacturerAccount.register(new ManufacturerAccount({username}), password, function(err) {
    console.log(arguments);
    res.json({msg: 'ok'});clear
  });
}

module.exports = router;
