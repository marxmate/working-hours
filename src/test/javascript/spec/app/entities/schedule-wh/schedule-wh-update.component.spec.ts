/* tslint:disable max-line-length */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { WorkinghoursTestModule } from '../../../test.module';
import { ScheduleWhUpdateComponent } from 'app/entities/schedule-wh/schedule-wh-update.component';
import { ScheduleWhService } from 'app/entities/schedule-wh/schedule-wh.service';
import { ScheduleWh } from 'app/shared/model/schedule-wh.model';

describe('Component Tests', () => {
    describe('ScheduleWh Management Update Component', () => {
        let comp: ScheduleWhUpdateComponent;
        let fixture: ComponentFixture<ScheduleWhUpdateComponent>;
        let service: ScheduleWhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkinghoursTestModule],
                declarations: [ScheduleWhUpdateComponent]
            })
                .overrideTemplate(ScheduleWhUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ScheduleWhUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleWhService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ScheduleWh(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.schedule = entity;
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
                    const entity = new ScheduleWh();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.schedule = entity;
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
