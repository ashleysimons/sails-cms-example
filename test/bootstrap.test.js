const sails = require('sails');

/**
 * print the stack of the error, rather than node just warning you and providing only the error message
 */
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  sails.lift({
    log: {
      level: 'error'
    },
    models: {
      connection: 'testMysqlServer',
      migrate: 'drop'
    },
    environment: 'test',
  }, function(err) {
    if (err) return done(err);
    var Barrels = require('barrels');
    var barrels = new Barrels();
    global.fixtures = barrels.data;
    barrels.populate(function(err) {
      done(err, sails);
    });
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});