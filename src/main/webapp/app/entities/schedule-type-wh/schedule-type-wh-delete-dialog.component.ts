import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IScheduleTypeWh } from 'app/shared/model/schedule-type-wh.model';
import { ScheduleTypeWhService } from './schedule-type-wh.service';

@Component({
    selector: 'wh-schedule-type-wh-delete-dialog',
    templateUrl: './schedule-type-wh-delete-dialog.component.html'
})
export class ScheduleTypeWhDeleteDialogComponent {
    scheduleType: IScheduleTypeWh;

    constructor(
        private scheduleTypeService: ScheduleTypeWhService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scheduleTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'scheduleTypeListModification',
                content: 'Deleted an scheduleType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'wh-schedule-type-wh-delete-popup',
    template: ''
})
export class ScheduleTypeWhDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ scheduleType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ScheduleTypeWhDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.scheduleType = scheduleType;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
