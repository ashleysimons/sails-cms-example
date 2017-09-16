module.exports = {
  index: function (req, res) {
    Page.find().sort('createdAt DESC')
      .then(function(pages){
        res.view('homepage', {pages: pages});
      }).catch(function(error){
        res.serverError(error);
      });
  },
  page: function (req, res) {
    let viewVars = {};
    Page.find().sort('createdAt DESC')
      .then(function(pages){
        viewVars.pages = pages;
        return Page.findOne(req.param('id'));
      })
      .then(function(page){
        viewVars.page = page;
        res.view('page', viewVars);
      })
      .catch(function(error){
        res.serverError(error);
      });
  },
};