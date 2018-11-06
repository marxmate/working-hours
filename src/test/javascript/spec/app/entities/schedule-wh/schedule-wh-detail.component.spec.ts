/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WorkinghoursTestModule } from '../../../test.module';
import { ScheduleWhDetailComponent } from 'app/entities/schedule-wh/schedule-wh-detail.component';
import { ScheduleWh } from 'app/shared/model/schedule-wh.model';

describe('Component Tests', () => {
    describe('ScheduleWh Management Detail Component', () => {
        let comp: ScheduleWhDetailComponent;
        let fixture: ComponentFixture<ScheduleWhDetailComponent>;
        const route = ({ data: of({ schedule: new ScheduleWh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WorkinghoursTestModule],
                declarations: [ScheduleWhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ScheduleWhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ScheduleWhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.schedule).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
