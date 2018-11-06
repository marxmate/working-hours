import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IScheduleTypeWh, ScheduleTypeWh } from 'app/shared/model/schedule-type-wh.model';
import { ScheduleTypeWhService } from './schedule-type-wh.service';
import { ScheduleTypeWhComponent } from './schedule-type-wh.component';
import { ScheduleTypeWhDetailComponent } from './schedule-type-wh-detail.component';
import { ScheduleTypeWhUpdateComponent } from './schedule-type-wh-update.component';
import { ScheduleTypeWhDeletePopupComponent } from './schedule-type-wh-delete-dialog.component';

@Injectable({ providedIn: 'root' })
export class ScheduleTypeWhResolve implements Resolve<IScheduleTypeWh> {
    constructor(private service: ScheduleTypeWhService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((scheduleType: HttpResponse<ScheduleTypeWh>) => scheduleType.body));
        }
        return of(new ScheduleTypeWh());
    }
}

export const scheduleTypeRoute: Routes = [
    {
        path: 'schedule-type-wh',
        component: ScheduleTypeWhComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workinghoursApp.scheduleType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'schedule-type-wh/:id/view',
        component: ScheduleTypeWhDetailComponent,
        resolve: {
            scheduleType: ScheduleTypeWhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workinghoursApp.scheduleType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'schedule-type-wh/new',
        component: ScheduleTypeWhUpdateComponent,
        resolve: {
            scheduleType: ScheduleTypeWhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workinghoursApp.scheduleType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'schedule-type-wh/:id/edit',
        component: ScheduleTypeWhUpdateComponent,
        resolve: {
            scheduleType: ScheduleTypeWhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workinghoursApp.scheduleType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const scheduleTypePopupRoute: Routes = [
    {
        path: 'schedule-type-wh/:id/delete',
        component: ScheduleTypeWhDeletePopupComponent,
        resolve: {
            scheduleType: ScheduleTypeWhResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'workinghoursApp.scheduleType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
