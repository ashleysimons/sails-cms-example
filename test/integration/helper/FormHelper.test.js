const expect = require('chai').expect;
const assert = require('chai').assert;
const sinon = require('sinon');
const FormHelper = require('api/helper/form');
const PageForm = require('api/helper/forms/page');

describe('FormHelper integration', function() {

  describe('basics', function() {

    it('sets form and req', function () {
      let req = sinon.spy();
      let form = new PageForm();
      let helper = new FormHelper(req, form);

      assert.equal(helper.req, req);
      assert.equal(helper.form, form);
    });

  });

  describe('Errors', function(){
    let req, form, helper;
    beforeEach(function(){
      req = sinon.spy();
      form = new PageForm();
      helper = new FormHelper(req, form);
    });

    it("Can store errors", function(){
      helper.addError('summary', "Invalid");
      expect(form.summary['errors'][0]).to.equal("Invalid");
    });

    it("Can retrieve errors", function(){
      helper.addError('content', "Invalid msg");
      let errors = helper.getErrors('content');
      expect(errors[0]).to.equal("Invalid msg");
    });

    it("Can detect an error", function(){
      helper.addError('content', "Invalid msg");
      assert.isTrue(helper.hasError('content'));
    });

    it("hasErrors returns true", function(){
      assert.isFalse(helper.hasErrors());
      helper.addError('content', "Invalid msg");
      assert.isTrue(helper.hasErrors());
    })

  });

  describe("Sets values from request", function(){
   it("values match request", function(){
     let req = { param: sinon.stub() };
     req.param.withArgs('title').returns('title');
     req.param.withArgs('content').returns('content');
     req.param.withArgs('summary').returns('summary');
     let form = new PageForm();
     let helper = new FormHelper(req, form);

     helper.setValues();

     expect(helper.value('title')).to.equal('title');
     expect(helper.value('content')).to.equal('content');
     expect(helper.value('summary')).to.equal('summary');

   });

  })

});