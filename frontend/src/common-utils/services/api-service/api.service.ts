import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {OwnEvent} from '../../../app/event';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  public getAllEvents(): Observable<OwnEvent[]> {
    return this.http
      .get(API_URL + '/events')
      .map(response => {
        const events = response.json();
        return events.map((e) => new OwnEvent(e));
      })
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
