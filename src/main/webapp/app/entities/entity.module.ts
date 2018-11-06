import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { WorkinghoursScheduleTypeWhModule } from './schedule-type-wh/schedule-type-wh.module';
import { WorkinghoursScheduleWhModule } from './schedule-wh/schedule-wh.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        WorkinghoursScheduleTypeWhModule,
        WorkinghoursScheduleWhModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkinghoursEntityModule {}
