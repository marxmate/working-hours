/* tslint:disable max-line-length */
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WorkinghoursTestModule } from '../../../test.module';
import { ScheduleWhDeleteDialogComponent } from 'app/entities/schedule-wh/schedule-wh-delete-dialog.component';
import { ScheduleWhService } from 'app/entities/schedule-wh/schedule-wh.service';

describe('Component Tests', () => {
    describe('ScheduleWh Management Delete Component', () => {
        let comp: ScheduleWhDeleteDialogComponent;
        let fixture: ComponentFixture<ScheduleWhDeleteDialogComponent>;
        let service: ScheduleWhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkinghoursTestModule],
                declarations: [ScheduleWhDeleteDialogComponent]
            })
                .overrideTemplate(ScheduleWhDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ScheduleWhDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleWhService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
