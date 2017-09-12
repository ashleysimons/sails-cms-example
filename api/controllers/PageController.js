const FormHelper = require('../helper/form');
const PageForm = require('../helper/forms/page');
const validator = require('validator');
const isRequired = 'Frield is required. ';
module.exports = {
  index: function (req, res) {
    res.view('admin/page');
  },
  create: function (req, res) {
    let form = new PageForm();
    let helper = new FormHelper(req, form);

    if(req.method == 'POST'){

      if(validator.isEmpty(req.param('title'), "")){
        helper.addError('title', isRequired)
      }
      if(validator.isEmpty(req.param('summary', ""))){
        helper.addError('summary', isRequired)
      }
      if(validator.isEmpty(req.param('content', ""))){
        helper.addError('content', isRequired)
      }
      if(helper.hasErrors()){
        res.view('admin/page-create', {form: helper});
      } else {
        Page.create(_.omit(req.allParams(), 'id'))
          .then(function(page){
            req.addFlash('success', "Created the page!");
            res.redirect('/admin/page');
          }).catch(function(error){
            res.serverError(error);
          });
      }

    } else {
      res.view('admin/page-create', {form: helper});
    }
  },
}