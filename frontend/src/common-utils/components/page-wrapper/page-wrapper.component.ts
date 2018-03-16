import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'wh-page-wrapper',
  templateUrl: 'page-wrapper.component.html',
  styleUrls: ['page-wrapper.component.css']
})
export class PageWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // ajaxGet('/login', null);
  }

}
