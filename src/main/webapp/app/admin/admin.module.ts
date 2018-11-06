import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { WorkinghoursSharedModule } from 'app/shared';
import {
    adminState,
    AuditsComponent,
    LogsComponent,
    UserMgmtComponent,
    UserMgmtDeleteDialogComponent,
    UserMgmtDetailComponent,
    UserMgmtUpdateComponent,
    WhConfigurationComponent,
    WhDocsComponent,
    WhHealthCheckComponent,
    WhHealthModalComponent,
    WhMetricsMonitoringComponent,
    WhMetricsMonitoringModalComponent
} from './';

/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

@NgModule({
    imports: [
        WorkinghoursSharedModule,
        RouterModule.forChild(adminState)
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        AuditsComponent,
        UserMgmtComponent,
        UserMgmtDetailComponent,
        UserMgmtUpdateComponent,
        UserMgmtDeleteDialogComponent,
        LogsComponent,
        WhConfigurationComponent,
        WhHealthCheckComponent,
        WhHealthModalComponent,
        WhDocsComponent,
        WhMetricsMonitoringComponent,
        WhMetricsMonitoringModalComponent
    ],
    entryComponents: [UserMgmtDeleteDialogComponent, WhHealthModalComponent, WhMetricsMonitoringModalComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkinghoursAdminModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
