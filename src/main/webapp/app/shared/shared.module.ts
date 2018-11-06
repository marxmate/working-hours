import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { HasAnyAuthorityDirective, WhLoginModalComponent, WorkinghoursSharedCommonModule, WorkinghoursSharedLibsModule } from './';

@NgModule({
    imports: [WorkinghoursSharedLibsModule, WorkinghoursSharedCommonModule],
    declarations: [WhLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [WhLoginModalComponent],
    exports: [WorkinghoursSharedCommonModule, WhLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WorkinghoursSharedModule {}
