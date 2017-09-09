const expect = require('chai').expect;
const assert = require('chai').assert;
const request = require('supertest');

describe('CiphersService unit', function() {

  describe('session IDs are strings', function() {

    it('should load page', function () {
      let id = CipherService.generateSessionId();
      expect(id).to.be.a('string');
    });

  });

});