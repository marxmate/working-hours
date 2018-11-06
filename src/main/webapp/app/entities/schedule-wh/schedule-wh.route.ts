import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IScheduleWh, ScheduleWh } from 'app/shared/model/schedule-wh.model';
import { ScheduleWhService } from './schedule-wh.service';
import { ScheduleWhComponent } from './schedule-wh.component';
import { ScheduleWhDetailComponent } from './schedule-wh-detail.component';
import { ScheduleWhUpdateComponent } from './schedule-wh-update.component';
import { ScheduleWhDeletePopupComponent } from './schedule-wh-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ScheduleWhResolve implements Resolve<IScheduleWh> {
    constructor(private service: ScheduleWhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((schedule: HttpResponse<ScheduleWh>) => schedule.body));
        }
        return of(new ScheduleWh());
    }
}

export const scheduleRoute: Routes = [
    {
        path: 'schedule-wh',
        component: ScheduleWhComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'workinghoursApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'schedule-wh/:id/view',
        component: ScheduleWhDetailComponent,
        resolve: {
            schedule: ScheduleWhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workinghoursApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'schedule-wh/new',
        component: ScheduleWhUpdateComponent,
        resolve: {
            schedule: ScheduleWhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workinghoursApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'schedule-wh/:id/edit',
        component: ScheduleWhUpdateComponent,
        resolve: {
            schedule: ScheduleWhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workinghoursApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schedulePopupRoute: Routes = [
    {
        path: 'schedule-wh/:id/delete',
        component: ScheduleWhDeletePopupComponent,
        resolve: {
            schedule: ScheduleWhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workinghoursApp.schedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
