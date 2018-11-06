/* tslint:disable max-line-length */
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WorkinghoursTestModule } from '../../../test.module';
import { ScheduleTypeWhDeleteDialogComponent } from 'app/entities/schedule-type-wh/schedule-type-wh-delete-dialog.component';
import { ScheduleTypeWhService } from 'app/entities/schedule-type-wh/schedule-type-wh.service';

describe('Component Tests', () => {
    describe('ScheduleTypeWh Management Delete Component', () => {
        let comp: ScheduleTypeWhDeleteDialogComponent;
        let fixture: ComponentFixture<ScheduleTypeWhDeleteDialogComponent>;
        let service: ScheduleTypeWhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkinghoursTestModule],
                declarations: [ScheduleTypeWhDeleteDialogComponent]
            })
                .overrideTemplate(ScheduleTypeWhDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ScheduleTypeWhDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleTypeWhService);
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
