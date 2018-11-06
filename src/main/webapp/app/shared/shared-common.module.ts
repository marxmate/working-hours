import { NgModule } from '@angular/core';

import { FindLanguageFromKeyPipe, WhAlertComponent, WhAlertErrorComponent, WorkinghoursSharedLibsModule } from './';

@NgModule({
    imports: [WorkinghoursSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, WhAlertComponent, WhAlertErrorComponent],
    exports: [WorkinghoursSharedLibsModule, FindLanguageFromKeyPipe, WhAlertComponent, WhAlertErrorComponent]
})
export class WorkinghoursSharedCommonModule {}
