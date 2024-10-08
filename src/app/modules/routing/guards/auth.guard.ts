import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../user/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.authService.getUser$().pipe(
      map(user => {
        if(user) {
          return true;
        } else {
          this.authService.setRedirectUrl(url);
          return this.router.createUrlTree(
            ['auth'],
            {queryParams: {lang: route.queryParams?.lang}}
          )
        }
      })
    )
  }
}
