import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, tap } from 'rxjs/operators';
import { MatsukazeObjectTypes, User } from 'src/app/model/model';
import * as apiJson from './user.endpoints.json'
import { ApiService } from 'src/app/services/api/api.service';
import { PersistenceService } from 'src/app/services/persistence/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
      map(matsukazeObject => {
        if(matsukazeObject?.matsukazeObjectType===MatsukazeObjectTypes.user) this._setUser(matsukazeObject);
        return matsukazeObject;
      }),
      tap(() => {if(this._user) this.persistenceService.store$(endpoint, this._user).subscribe()})
    );
  }

  public confirm$(params: any): Observable<any> {
    if(params?.email && params?.activationCode) {
      return this.apiService.request$(this._endpoints.actions.auth.confirm, params).pipe(
        mergeMap(obj => {
          if(obj.matsukazeObjectType===MatsukazeObjectTypes.user) {
            return this.loginFromConfirm$(obj);
          } else {
            return of(obj);
          }
        })
      )
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
        { email: params.email, password: params.password, lang: params.lang }
      )
    }
    return of(null);
  }

  public getUser$(): Observable<User> {
    if(this._user) { return of(this._user) } else { return of(null) };
  }

  public requestPasswordReset$(email: string, lang?: string): Observable<any> {
    if(email) return this.apiService.request$(
      this._endpoints.actions.auth.requestReset,
      { email: email, lang: lang }
    );
    return of(null);
  }

  public resetPassword$(email: string, password: string, code: string): Observable<any> {
    if(email && password && code) {
      return this.apiService.request$(
        this._endpoints.actions.auth.reset,
        {email: email, password: password, code: code}
      );
    }
    return of(null);
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
