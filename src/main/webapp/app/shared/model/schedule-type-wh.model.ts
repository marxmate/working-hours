export interface IScheduleTypeWh {
    id?: number;
    name?: string;
    fromTime?: string;
    toTime?: string;
}

export class ScheduleTypeWh implements IScheduleTypeWh {
    constructor(public id?: number, public name?: string, public fromTime?: string, public toTime?: string) {}
}
