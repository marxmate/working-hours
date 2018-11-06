/* tslint:disable max-line-length */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { WorkinghoursTestModule } from '../../../test.module';
import { ScheduleTypeWhUpdateComponent } from 'app/entities/schedule-type-wh/schedule-type-wh-update.component';
import { ScheduleTypeWhService } from 'app/entities/schedule-type-wh/schedule-type-wh.service';
import { ScheduleTypeWh } from 'app/shared/model/schedule-type-wh.model';

describe('Component Tests', () => {
    describe('ScheduleTypeWh Management Update Component', () => {
        let comp: ScheduleTypeWhUpdateComponent;
        let fixture: ComponentFixture<ScheduleTypeWhUpdateComponent>;
        let service: ScheduleTypeWhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkinghoursTestModule],
                declarations: [ScheduleTypeWhUpdateComponent]
            })
                .overrideTemplate(ScheduleTypeWhUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ScheduleTypeWhUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleTypeWhService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ScheduleTypeWh(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.scheduleType = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ScheduleTypeWh();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.scheduleType = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
