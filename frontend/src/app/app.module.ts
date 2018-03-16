import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ScheduleModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {LoginFormComponent} from '../common-utils/components/login-form/login-form.component';
import {PageWrapperComponent} from '../common-utils/components/page-wrapper/page-wrapper.component';
import {SchedulerComponent} from '../common-utils/components/scheduler/scheduler.component';
import {ApiService} from '../common-utils/services/api-service/api.service';
import {EventService} from '../common-utils/services/event-service/event.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    PageWrapperComponent,
    SchedulerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ScheduleModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
