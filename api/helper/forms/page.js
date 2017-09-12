'use strict';

class PageForm {

  constructor(){
    this.title = [];
    this.title['errors'] = [];
    this.title['value'] = '';

    this.summary = [];
    this.summary['errors'] = [];
    this.summary['value'] = '';

    this.content = [];
    this.content['errors'] = [];
    this.content['value'] = '';

    this.elements = ['title', 'summary', 'content'];
  }

}

module.exports = PageForm;
