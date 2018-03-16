import {Component, OnInit} from '@angular/core';
import {EventService} from '../common-utils/services/event-service/event.service';


@Component({
  selector: 'wh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EventService]
})
export class AppComponent implements OnInit {

  title = 'App works!';

   constructor() {
  }

  public ngOnInit() {
  }
}
