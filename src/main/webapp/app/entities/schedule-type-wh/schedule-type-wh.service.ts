import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IScheduleTypeWh } from 'app/shared/model/schedule-type-wh.model';

type EntityResponseType = HttpResponse<IScheduleTypeWh>;
type EntityArrayResponseType = HttpResponse<IScheduleTypeWh[]>;

@Injectable({ providedIn: 'root' })
export class ScheduleTypeWhService {
    private resourceUrl = SERVER_API_URL + 'api/schedule-types';

    constructor(private http: HttpClient) {}

    create(scheduleType: IScheduleTypeWh): Observable<EntityResponseType> {
        return this.http.post<IScheduleTypeWh>(this.resourceUrl, scheduleType, { observe: 'response' });
    }

    update(scheduleType: IScheduleTypeWh): Observable<EntityResponseType> {
        return this.http.put<IScheduleTypeWh>(this.resourceUrl, scheduleType, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IScheduleTypeWh>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IScheduleTypeWh[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
