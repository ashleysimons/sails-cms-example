'use strict';

class FormHelper {
  constructor(req, form){
    this.req = req;
    this.form = form;
  }

  addError(key, error){
    this.form[key]['errors'].push(error);
  }
  hasError(key) {
    if(this.form[key]['errors'].length > 0){
      return true;
    }
    return false;
  }
  hasErrors(){
    let elements = this.form.elements;
    for(let i=0;i<elements.length;i++){
     if(this.form[elements[i]]['errors'].length > 0){
       return true;
     }
    }
    return false;
  }
  getErrors(key){
    return this.form[key]['errors'];
  }
  value(key){
    return this.form[key]['value'];
  }
  setValues(){
    let elements = this.form.elements;
    for(let i=0;i<elements.length;i++){
      let value = this.req.param(elements[i]);
      this.form[elements[i]]['value'] = value;
    }
  }
}

module.exports = FormHelper;
