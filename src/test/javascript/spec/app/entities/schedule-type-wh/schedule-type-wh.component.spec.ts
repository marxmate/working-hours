/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WorkinghoursTestModule } from '../../../test.module';
import { ScheduleTypeWhComponent } from 'app/entities/schedule-type-wh/schedule-type-wh.component';
import { ScheduleTypeWhService } from 'app/entities/schedule-type-wh/schedule-type-wh.service';
import { ScheduleTypeWh } from 'app/shared/model/schedule-type-wh.model';

describe('Component Tests', () => {
    describe('ScheduleTypeWh Management Component', () => {
        let comp: ScheduleTypeWhComponent;
        let fixture: ComponentFixture<ScheduleTypeWhComponent>;
        let service: ScheduleTypeWhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkinghoursTestModule],
                declarations: [ScheduleTypeWhComponent],
                providers: []
            })
                .overrideTemplate(ScheduleTypeWhComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ScheduleTypeWhComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleTypeWhService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ScheduleTypeWh(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.scheduleTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
