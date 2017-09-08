const expect = require('chai').expect;
const assert = require('chai').assert;
const request = require('supertest');

describe('Login Controller Integration', function() {
  const loginPath = '/login';

  describe(`POST ${loginPath}`, function() {

    it('should load page', function (done) {
      request(sails.hooks.http.app)
        .get(loginPath)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

  });

});