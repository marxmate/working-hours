import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IScheduleWh } from 'app/shared/model/schedule-wh.model';

type EntityResponseType = HttpResponse<IScheduleWh>;
type EntityArrayResponseType = HttpResponse<IScheduleWh[]>;

@Injectable({ providedIn: 'root' })
export class ScheduleWhService {
    private resourceUrl = SERVER_API_URL + 'api/schedules';

    constructor(private http: HttpClient) {}

    create(schedule: IScheduleWh): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(schedule);
        return this.http
            .post<IScheduleWh>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(schedule: IScheduleWh): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(schedule);
        return this.http
            .put<IScheduleWh>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IScheduleWh>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IScheduleWh[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(schedule: IScheduleWh): IScheduleWh {
        const copy: IScheduleWh = Object.assign({}, schedule, {
            date: schedule.date != null && schedule.date.isValid() ? schedule.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((schedule: IScheduleWh) => {
            schedule.date = schedule.date != null ? moment(schedule.date) : null;
        });
        return res;
    }
}
