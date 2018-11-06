import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WorkinghoursSharedModule } from 'app/shared';
import {
    scheduleTypePopupRoute,
    scheduleTypeRoute,
    ScheduleTypeWhComponent,
    ScheduleTypeWhDeleteDialogComponent,
    ScheduleTypeWhDeletePopupComponent,
    ScheduleTypeWhDetailComponent,
    ScheduleTypeWhUpdateComponent
} from './';

const ENTITY_STATES = [...scheduleTypeRoute, ...scheduleTypePopupRoute];

@NgModule({
    imports: [WorkinghoursSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ScheduleTypeWhComponent,
        ScheduleTypeWhDetailComponent,
        ScheduleTypeWhUpdateComponent,
        ScheduleTypeWhDeleteDialogComponent,
        ScheduleTypeWhDeletePopupComponent
    ],
    entryComponents: [
        ScheduleTypeWhComponent,
        ScheduleTypeWhUpdateComponent,
        ScheduleTypeWhDeleteDialogComponent,
        ScheduleTypeWhDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkinghoursScheduleTypeWhModule {}
