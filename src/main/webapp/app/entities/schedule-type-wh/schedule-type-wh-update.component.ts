import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IScheduleTypeWh } from 'app/shared/model/schedule-type-wh.model';
import { ScheduleTypeWhService } from './schedule-type-wh.service';
import { IScheduleWh } from 'app/shared/model/schedule-wh.model';
import { ScheduleWhService } from 'app/entities/schedule-wh';

@Component({
    selector: 'wh-schedule-type-wh-update',
    templateUrl: './schedule-type-wh-update.component.html'
})
export class ScheduleTypeWhUpdateComponent implements OnInit {
    private _scheduleType: IScheduleTypeWh;
    isSaving: boolean;

    names: IScheduleWh[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private scheduleTypeService: ScheduleTypeWhService,
        private scheduleService: ScheduleWhService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ scheduleType }) => {
            this.scheduleType = scheduleType;
        });
        this.scheduleService.query({ filter: 'scheduletype-is-null' }).subscribe(
            (res: HttpResponse<IScheduleWh[]>) => {
                if (!this.scheduleType.name || !this.scheduleType.id) {
                    this.names = res.body;
                } else {
                    this.scheduleService.find(this.scheduleType.id).subscribe(
                        (subRes: HttpResponse<IScheduleWh>) => {
                            this.names = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.scheduleType.id !== undefined) {
            this.subscribeToSaveResponse(this.scheduleTypeService.update(this.scheduleType));
        } else {
            this.subscribeToSaveResponse(this.scheduleTypeService.create(this.scheduleType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IScheduleTypeWh>>) {
        result.subscribe((res: HttpResponse<IScheduleTypeWh>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackScheduleById(index: number, item: IScheduleWh) {
        return item.id;
    }
    get scheduleType() {
        return this._scheduleType;
    }

    set scheduleType(scheduleType: IScheduleTypeWh) {
        this._scheduleType = scheduleType;
    }
}
