import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { IScheduleTypeWh } from 'app/shared/model/schedule-type-wh.model';
import { Principal } from 'app/core';
import { ScheduleTypeWhService } from './schedule-type-wh.service';

@Component({
    selector: 'wh-schedule-type-wh',
    templateUrl: './schedule-type-wh.component.html'
})
export class ScheduleTypeWhComponent implements OnInit, OnDestroy {
    scheduleTypes: IScheduleTypeWh[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private scheduleTypeService: ScheduleTypeWhService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.scheduleTypeService.query().subscribe(
            (res: HttpResponse<IScheduleTypeWh[]>) => {
                this.scheduleTypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInScheduleTypes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IScheduleTypeWh) {
        return item.id;
    }

    registerChangeInScheduleTypes() {
        this.eventSubscriber = this.eventManager.subscribe('scheduleTypeListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
