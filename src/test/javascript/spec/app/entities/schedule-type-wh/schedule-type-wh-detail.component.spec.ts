/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorkinghoursTestModule } from '../../../test.module';
import { ScheduleTypeWhDetailComponent } from 'app/entities/schedule-type-wh/schedule-type-wh-detail.component';
import { ScheduleTypeWh } from 'app/shared/model/schedule-type-wh.model';

describe('Component Tests', () => {
    describe('ScheduleTypeWh Management Detail Component', () => {
        let comp: ScheduleTypeWhDetailComponent;
        let fixture: ComponentFixture<ScheduleTypeWhDetailComponent>;
        const route = ({ data: of({ scheduleType: new ScheduleTypeWh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkinghoursTestModule],
                declarations: [ScheduleTypeWhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ScheduleTypeWhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ScheduleTypeWhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.scheduleType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
