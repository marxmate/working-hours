import { Moment } from 'moment';
import { IScheduleTypeWh } from 'app/shared/model/schedule-type-wh.model';

export interface IScheduleWh {
    id?: number;
    user?: string;
    scheduleType?: IScheduleTypeWh;
    date?: Moment;
}

export class ScheduleWh implements IScheduleWh {
    constructor(public id?: number, public user?: string, public scheduleType?: IScheduleTypeWh, public date?: Moment) {}
}
