import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IScheduleTypeWh } from 'app/shared/model/schedule-type-wh.model';

@Component({
    selector: 'wh-schedule-type-wh-detail',
    templateUrl: './schedule-type-wh-detail.component.html'
})
export class ScheduleTypeWhDetailComponent implements OnInit {
    scheduleType: IScheduleTypeWh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ scheduleType }) => {
            this.scheduleType = scheduleType;
        });
    }

    previousState() {
        window.history.back();
    }
}
