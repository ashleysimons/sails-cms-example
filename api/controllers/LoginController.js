const message = "Did not match records. ";
module.exports = {
  index: function (req, res) {
    Page.find().sort('createdAt DESC')
      .then(function(pages){
        res.view('login/index', {pages: pages});
      })
      .catch(function(error){
        res.serverError(error);
      });
  },
  post: function(req, res) {
    AuthService.hasCorrectPassword(req.param('email'), req.param('password'))
      .then(function(user) {
        AuthService.createSession(user)
          .then(function(session){
            req.addFlash('success', "You were signed in!");
            res.cookie('said', session.token, { maxAge: 60*60*60*24*31, httpOnly: true });
            res.redirect('/admin/page');
          })
          .catch(function(error){
            res.serverError(error);
          })
      })
    .catch(function(error){
      req.addFlash('danger', message);
      res.redirect('/login');
    });
  },
  signout: function(req, res){
    sails.log.debug(req.cookies.said);
    if(req.cookies.said != undefined){
      Session.destroy({token: req.cookies.said})
        .exec(function(err){
          if(err){
            return res.serverError(err);
          }
          req.addFlash('success', "You were logged out!");
          res.cookie('said', null, { maxAge: 60*60*60*24*31, httpOnly: true });
          res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
  }
};