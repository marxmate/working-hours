import { Route } from '@angular/router';

import { WhMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
    path: 'wh-metrics',
    component: WhMetricsMonitoringComponent,
    data: {
        pageTitle: 'metrics.title'
    }
};
