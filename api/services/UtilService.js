module.exports = {
  isPrevious: function(pageCount, req){
    let page = req.param('page', 1);
    if(page <= pageCount && page != 1){
      return true;
    }
    return false;
  },
  isNext: function(pageCount, req){
    let page = req.param('page', 1);
    if(page < pageCount){
      return true;
    }
    return false;
  }
}