import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkinghoursSharedModule } from 'app/shared';
import {
    schedulePopupRoute,
    scheduleRoute,
    ScheduleWhComponent,
    ScheduleWhDeleteDialogComponent,
    ScheduleWhDeletePopupComponent,
    ScheduleWhDetailComponent,
    ScheduleWhUpdateComponent
} from './';

const ENTITY_STATES = [...scheduleRoute, ...schedulePopupRoute];

@NgModule({
    imports: [WorkinghoursSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ScheduleWhComponent,
        ScheduleWhDetailComponent,
        ScheduleWhUpdateComponent,
        ScheduleWhDeleteDialogComponent,
        ScheduleWhDeletePopupComponent
    ],
    entryComponents: [ScheduleWhComponent, ScheduleWhUpdateComponent, ScheduleWhDeleteDialogComponent, ScheduleWhDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkinghoursScheduleWhModule {}
