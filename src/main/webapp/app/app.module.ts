import './vendor.ts';

import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService, Ng2Webstorage, SessionStorageService } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { WorkinghoursSharedModule } from 'app/shared';
import { WorkinghoursCoreModule } from 'app/core';
import { WorkinghoursAppRoutingModule } from './app-routing.module';
import { WorkinghoursHomeModule } from './home/home.module';
import { WorkinghoursAccountModule } from './account/account.module';
import { WorkinghoursEntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { ActiveMenuDirective, ErrorComponent, FooterComponent, NavbarComponent, PageRibbonComponent, WhMainComponent } from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        WorkinghoursAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'wh', separator: '-' }),
        WorkinghoursSharedModule,
        WorkinghoursCoreModule,
        WorkinghoursHomeModule,
        WorkinghoursAccountModule,
        WorkinghoursEntityModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [WhMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        }
    ],
    bootstrap: [WhMainComponent]
})
export class WorkinghoursAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
