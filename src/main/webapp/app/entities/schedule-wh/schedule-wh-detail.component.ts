import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IScheduleWh } from 'app/shared/model/schedule-wh.model';

@Component({
    selector: 'wh-schedule-wh-detail',
    templateUrl: './schedule-wh-detail.component.html'
})
export class ScheduleWhDetailComponent implements OnInit {
    schedule: IScheduleWh;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ schedule }) => {
            this.schedule = schedule;
        });
    }

    previousState() {
        window.history.back();
    }
}
