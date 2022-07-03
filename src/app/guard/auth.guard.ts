import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { NotifierService } from '../services/notification-services/notifier.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private snackbar: NotifierService
    ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    }
    this.router.navigate(['']);
    this.snackbar.showNotification('Session Expired, You need to log in again','','error')
    return false;
  }
}
