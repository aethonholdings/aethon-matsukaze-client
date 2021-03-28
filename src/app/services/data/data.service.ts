import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/model/model';
import { ApiService } from '../api/api.service';
import { PersistenceService } from '../persistence/persistence.service';
import * as apiJson from './data.endpoints.json'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _verbose: boolean = true;
  private _env: string = "dev";
  private _user: User;
  private _redirectUrl: string;
  private _endpoints: any = apiJson["default"];

  constructor(private apiService: ApiService, private persistenceService: PersistenceService) {
    let root: string = this._endpoints.root[this._env];
    this.apiService.initialise(root, this._verbose);
    // this.persistenceService.initialise().then(response => {console.log(response)});
  }

  public setRedirectUrl(url: string) { this._redirectUrl = url; }

  public getRedirectUrl() { return this._redirectUrl; }

  public login$(email: string, password: string): Observable<User> {
    return this.apiService.request$(this._endpoints.actions.auth.login, {email: email, password: password}).pipe(
      map( data => {
        if(data?.user) {
          this._user = new User(data.user);
          return this._user;
        }
        else return null;
      })
    );
  }

  public getUser(): User { return this._user }

}
