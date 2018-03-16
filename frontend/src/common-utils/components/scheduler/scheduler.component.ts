import {Component, OnInit} from '@angular/core';
import {OwnEvent} from '../../../app/event';
import {EventService} from '../../services/event-service/event.service';

@Component({
  selector: 'wh-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  events: OwnEvent[] = [];

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.eventService
      .getAllEvents()
      .subscribe(
        (events) => {
          this.events = events;
        }
      );
  }
}
