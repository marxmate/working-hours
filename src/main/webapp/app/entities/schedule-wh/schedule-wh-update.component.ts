import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IScheduleWh } from 'app/shared/model/schedule-wh.model';
import { ScheduleWhService } from './schedule-wh.service';
import { IScheduleTypeWh } from 'app/shared/model/schedule-type-wh.model';
import { ScheduleTypeWhService } from 'app/entities/schedule-type-wh';

@Component({
    selector: 'wh-schedule-wh-update',
    templateUrl: './schedule-wh-update.component.html'
})
export class ScheduleWhUpdateComponent implements OnInit {
    private _schedule: IScheduleWh;
    isSaving: boolean;

    scheduletypes: IScheduleTypeWh[];
    dateDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private scheduleService: ScheduleWhService,
        private scheduleTypeService: ScheduleTypeWhService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ schedule }) => {
            this.schedule = schedule;
        });
        this.scheduleTypeService.query().subscribe(
            (res: HttpResponse<IScheduleTypeWh[]>) => {
                this.scheduletypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.schedule.id !== undefined) {
            this.subscribeToSaveResponse(this.scheduleService.update(this.schedule));
        } else {
            this.subscribeToSaveResponse(this.scheduleService.create(this.schedule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IScheduleWh>>) {
        result.subscribe((res: HttpResponse<IScheduleWh>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackScheduleTypeById(index: number, item: IScheduleTypeWh) {
        return item.id;
    }
    get schedule() {
        return this._schedule;
    }

    set schedule(schedule: IScheduleWh) {
        this._schedule = schedule;
    }
}
