import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { WorkinghoursTestModule } from '../../../test.module';
import { WhMetricsMonitoringComponent } from 'app/admin/metrics/metrics.component';
import { WhMetricsService } from 'app/admin/metrics/metrics.service';

describe('Component Tests', () => {
    describe('WhMetricsMonitoringComponent', () => {
        let comp: WhMetricsMonitoringComponent;
        let fixture: ComponentFixture<WhMetricsMonitoringComponent>;
        let service: WhMetricsService;

        beforeEach(
            async(() => {
                TestBed.configureTestingModule({
                    imports: [WorkinghoursTestModule],
                    declarations: [WhMetricsMonitoringComponent]
                })
                    .overrideTemplate(WhMetricsMonitoringComponent, '')
                    .compileComponents();
            })
        );

        beforeEach(() => {
            fixture = TestBed.createComponent(WhMetricsMonitoringComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WhMetricsService);
        });

        describe('refresh', () => {
            it('should call refresh on init', () => {
                // GIVEN
                const response = {
                    timers: {
                        service: 'test',
                        unrelatedKey: 'test'
                    },
                    gauges: {
                        'jcache.statistics': {
                            value: 2
                        },
                        unrelatedKey: 'test'
                    }
                };
                spyOn(service, 'getMetrics').and.returnValue(of(response));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.getMetrics).toHaveBeenCalled();
                expect(comp.servicesStats).toEqual({ service: 'test' });
                expect(comp.cachesStats).toEqual({ jcache: { name: 17, value: 2 } });
            });
        });

        describe('isNan', () => {
            it('should return if a variable is NaN', () => {
                expect(comp.filterNaN(1)).toBe(1);
                expect(comp.filterNaN('test')).toBe(0);
            });
        });
    });
});
