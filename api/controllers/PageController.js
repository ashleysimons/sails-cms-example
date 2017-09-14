const FormHelper = require('../helper/form');
const PageForm = require('../helper/forms/page');
const validator = require('validator');
const isRequired = 'Frield is required. ';
const limit = 2;
module.exports = {
  index: function (req, res) {
    let pageNo = req.param('page') ? req.param('page') : 1;
    let viewVars = {};

    Page.find().sort('createdAt desc').paginate({page: pageNo, limit: limit })
      .then(function(pages){
        viewVars.pages = pages;
        return Page.count();
      })
      .then(function(count){
        viewVars.count = count;
        viewVars.pageCount = Math.floor(count / limit);
        res.view('admin/page', viewVars);
      })
      .catch(function(error){
        res.serverError(error)
      });
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
  edit: function (req, res) {
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
        Page.update(req.param('id'), _.omit(req.allParams(), 'id'))
          .then(function(page){
            req.addFlash('success', "Edited the page!");
            res.redirect('/admin/page/'+req.param('id'));
          }).catch(function(error){
            res.serverError(error);
          });
      }

    } else {
      Page.findOne(req.param('id'))
        .then(function(page){
          if(!page) {
            res.notFound();
          } else {
            res.view('admin/page-edit', {page: page, form: helper});
          }
        })
        .catch(function(error){
          res.serverError(error);
        });
    }
  },
}