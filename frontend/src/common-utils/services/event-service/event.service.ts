import {Injectable} from '@angular/core';
import {ApiService} from '../api-service/api.service';
import {Observable} from 'rxjs/Observable';
import {OwnEvent} from '../../../app/event';

@Injectable()
export class EventService {

  constructor(private api: ApiService) { }

  getAllEvents(): Observable<OwnEvent[]> {
    return this.api.getAllEvents();
  }

}
