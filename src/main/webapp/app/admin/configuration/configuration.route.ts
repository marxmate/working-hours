import { Route } from '@angular/router';

import { WhConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
    path: 'wh-configuration',
    component: WhConfigurationComponent,
    data: {
        pageTitle: 'configuration.title'
    }
};
