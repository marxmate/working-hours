import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Principal } from '../';
import { LoginModalService } from '../login/login-modal.service';
import { StateStorageService } from './state-storage.service';

@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        const authorities = route.data['authorities'];
        return this.checkLogin(authorities, state.url);
    }

    constructor(
        private router: Router,
        private loginModalService: LoginModalService,
        private principal: Principal,
        private stateStorageService: StateStorageService
    ) {}

    checkLogin(authorities: string[], url: string): Promise<boolean> {
        const principal = this.principal;
        return Promise.resolve(
            principal.identity().then(account => {
                if (!authorities || authorities.length === 0) {
                    return true;
                }

                if (account) {
                    return principal.hasAnyAuthority(authorities).then(response => {
                        if (response) {
                            return true;
                        }
                        if (isDevMode()) {
                            console.error('User has not any of required authorities: ', authorities);
                        }
                        return false;
                    });
                }

                this.stateStorageService.storeUrl(url);
                this.router.navigate(['accessdenied']).then(() => {
                    // only show the login dialog, if the user hasn't logged in yet
                    if (!account) {
                        this.loginModalService.open();
                    }
                });
                return false;
            })
        );
    }
}
