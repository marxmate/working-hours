import { Route } from '@angular/router';

import { WhDocsComponent } from './docs.component';

export const docsRoute: Route = {
    path: 'docs',
    component: WhDocsComponent,
    data: {
        pageTitle: 'global.menu.admin.apidocs'
    }
};
