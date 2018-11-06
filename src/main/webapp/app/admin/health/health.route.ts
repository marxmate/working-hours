import { Route } from '@angular/router';

import { WhHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
    path: 'wh-health',
    component: WhHealthCheckComponent,
    data: {
        pageTitle: 'health.title'
    }
};
