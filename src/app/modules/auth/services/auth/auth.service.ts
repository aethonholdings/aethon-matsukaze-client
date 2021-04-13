import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { MatsukazeError, User } from 'src/app/model/model';
import * as apiJson from './auth.endpoints.json'
import { ApiService } from 'src/app/services/api/api.service';
import { PersistenceService } from 'src/app/services/persistence/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User = null;
  private _verbose: boolean = true;
  private _env: string = "dev";
  private _redirectUrl: string;
  private _endpoints: any = apiJson["default"];

  constructor(private apiService: ApiService, private persistenceService: PersistenceService) {
    let root: string = this._endpoints.root[this._env];
    this.apiService.initialise(root, this._verbose);
    this.persistenceService.initialise(this._verbose);
    this.persistenceService.retrieve$(this._endpoints.actions.auth.login).subscribe(cacheable => {
      if(cacheable) this._setUser(cacheable.object);
    });
  }

  public login$(email: string, password: string): Observable<User> {
    const endpoint: any = this._endpoints.actions.auth.login;
    return this.apiService.request$(endpoint, {email: email, password: password}).pipe(
      mergeMap(data => {
        if(data) {
          this._setUser(data);
          return this.persistenceService.store$(endpoint, this._user);
        }
        else return of(null);
      }),
      map(() => { return this._user })
    );
  }

  public confirm$(params: any): Observable<any> {
    if(params?.email && params?.activationCode) {
      return this.apiService.request$(this._endpoints.actions.auth.confirm, params)
    }
    return of(null);
  }

  public loginFromConfirm$(user: User): Observable<User> {
    const endpoint: any = this._endpoints.actions.auth.login;
    this._setUser(user);
    return this.persistenceService.store$(endpoint, this._user).pipe(
      map(()=>{ return this._user; })
    );
  }

  public register$(params: any): Observable<any> {
    if(params?.email && params?.password) {
      return this.apiService.request$(
        this._endpoints.actions.auth.register,
        {email: params.email, password: params.password}
      )
    }
    return of(null);
  }

  public getUser$(): Observable<User> {
    if(this._user) { return of(this._user) } else { return of(null) };
  }

  public logout$(): Observable<boolean> {
    return this.persistenceService.clear$().pipe(
      map(success => {
        // should log out at the API?
        if(success) return this.apiService.logout(); else return false;
      })
    );
  }

  public setRedirectUrl(url: string) { this._redirectUrl = url; }

  public getRedirectUrl() { return this._redirectUrl; }

  private _setUser(json: any): User {
    this._user = new User(json);
    this.apiService.setToken(this._user.token);
    return this._user;
  }
}
