import { Injectable } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';
import * as apiJson from './api.spec.json'
import { catchError, map, share, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/model'

// SERVICE CONNECTS TO API, FETCHES AND CONVERTS JSON TO MATSUKAZE DTOs

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _test: boolean = true;
  private _root: string = null;
  private _verbose: boolean = true;
  private _headers: HttpHeaders;
  private _api: any = apiJson["default"];
  private _user: User;
  private _token: string = null;
  private _redirectUrl: string;

  constructor(private http: HttpClient) {
    if(this._test) this._root = this._api.root.dev; else this._root = this._api.root.test;
  }

  public setRedirectUrl(url: string) { this._redirectUrl = url; }

  public getRedirectUrl() { return this._redirectUrl; }

  public login$(email: string, password: string): Observable<User> {
    return this._request$(this._api.actions.auth.login, {email: email, password: password}).pipe(
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

  public isAuthenticated(): boolean { if(this._token) return true; else return false }

  // CRUD OPERATIONS -----------------------------------------------------------
  //
  // create$(dtoType: MatsukazeObjectTypes, params: any): Observable<any> {
  //   params["matsukazeObjectType"] = dtoType;
  //   return this.request$("create", dtoType, params).pipe(
  //     map(response => this.dtoFactory(dtoType, response)),
  //     share()
  //   );
  // }
  //
  // get$(dtoType: MatsukazeObjectTypes, id: number): Observable<any> {
  //   return this.request$("get", dtoType, {id: id, matsukazeObjectType: dtoType}).pipe(
  //     map(response => this.dtoFactory(dtoType, response)),
  //     share()
  //   )
  // }
  //
  // gets$(dtoType: MatsukazeObjectTypes, parentId: number): Observable<any[]> {
  //   return this.request$("gets", dtoType, {parentId: parentId,   matsukazeObjectType: dtoType}).pipe(
  //     map(data => {
  //       var array = [];
  //       for(let key in data) { array.push(this.dtoFactory(dtoType, data[key])); }
  //       return array
  //     }),
  //     share()
  //   );
  // }
  //
  // pull$(dtoType: MatsukazeObjectTypes, id: number): Observable<any> {
  //   return this.request$("pull", dtoType, {id: id}).pipe(
  //     map(json => new Story(json)),
  //     share()
  //   )
  // }
  //
  // update$(dtoType: MatsukazeObjectTypes, params: any): Observable<any> {
  //   params = params.toParams();
  //   return this.request$("update", dtoType, params).pipe(share());
  // }
  //
  // move$(dtoType: MatsukazeObjectTypes, params: any): Observable<any> {
  //   params["matsukazeObjectType"] = dtoType;
  //   return this.request$("move", dtoType, params).pipe(share());
  // }
  //
  // delete$(dtoType: MatsukazeObjectTypes, params: any): Observable<any> {
  //   params["matsukazeObjectType"] = dtoType;
  //   return this.request$("delete", dtoType, params).pipe(share());
  // }
  //
  // private dtoFactory(dtoType: MatsukazeObjectTypes, json: any): any {
  //   var obj: any;
  //   switch(dtoType) {
  //     case(MatsukazeObjectTypes.story): {
  //       obj = new Story(json);
  //       obj.children$ = this.setUpChildAsyncPipe$(obj, MatsukazeObjectTypes.act);
  //       break;
  //     }
  //     case(MatsukazeObjectTypes.act): {
  //       obj = new Act(json);
  //       obj.children$ = this.setUpChildAsyncPipe$(obj, MatsukazeObjectTypes.sceneSequence);
  //       break;
  //     }
  //     case(MatsukazeObjectTypes.sceneSequence): {
  //       obj = new SceneSequence(json);
  //       obj.children$ = this.setUpChildAsyncPipe$(obj, MatsukazeObjectTypes.scene);
  //       break;
  //     }
  //     case(MatsukazeObjectTypes.scene): {
  //       obj = new Scene(json);
  //       obj.children$ = this.setUpChildAsyncPipe$(obj, MatsukazeObjectTypes.beat);
  //       break;
  //     }
  //     case(MatsukazeObjectTypes.beat): {
  //       obj = new Beat(json);
  //       obj.children$ = this.setUpChildAsyncPipe$(obj, MatsukazeObjectTypes.momentSequence);
  //       break;
  //     }
  //     case(MatsukazeObjectTypes.momentSequence): {
  //       obj = new MomentSequence(json);
  //       obj.children$ = this.setUpChildAsyncPipe$(obj, MatsukazeObjectTypes.moment);
  //       break;
  //     }
  //     case(MatsukazeObjectTypes.moment): {
  //       obj = new Moment(json);
  //       obj.children$ = this.setUpChildAsyncPipe$(obj, MatsukazeObjectTypes.dialogueLine);
  //       break;
  //     }
  //     case(MatsukazeObjectTypes.dialogueLine): {
  //       obj = new DialogueLine(json);
  //       obj.i18nBundle = new I18nBundle(json.i18nBundle);
  //       for(let element in json.i18nBundle.i18nBundleElements) {
  //         obj.i18nBundle[element]= new I18nBundleElement(json.i18nBundle.i18nBundleElements[element]);
  //       }
  //       obj.children$ = null;
  //       obj.children = [];
  //       break;
  //     }
  //   }
  //   return obj;
  // }
  //
  // private setUpChildAsyncPipe$(obj: any, objType: MatsukazeObjectTypes): Observable<any> {
  //   return this.gets$(objType, obj.id).pipe(
  //     map(DTOdata => {
  //       obj.children = DTOdata;
  //       return(obj.children);
  //     })
  //   );
  // }
  //
  // private request$(action: any, objType: MatsukazeObjectTypes, params?: any, blob?: boolean): Observable<any> {
  //   var objectTypeLiteral: string = objType.charAt(0).toLowerCase() + objType.slice(1);
  //   var endpoint = this.api.actions[objectTypeLiteral][action];
  //   // need serious error handling here
  //   if(this.isAuthenticated()) return this._request$(endpoint, params, blob); else return of(null)
  // }
  //
  private _request$(action: any, data?: any, blob?: boolean): Observable<any> {
    var req: Observable<any>;
    const url = this._root + action.endpoint;

    if(this._verbose) {
      console.log("*** HTTP request starting" +
                  "\nheaders:" + JSON.stringify(this._headers) +
                  "\ntype:" + action.method +
                  "\nurl:" + url +
                  "\nData:" + JSON.stringify(data)
                )

    }
    switch(action.method) {
      case this._api.methods.get : {
        if(blob) req = this.http.get(url, {params: data, headers: this._headers, responseType: 'blob'});
        else req = this.http.get(url, {params: data, headers: this._headers});
        break;
      }
      case this._api.methods.post : {
        if(this._headers==null) req = this.http.post(url, data);
        else req = this.http.post(url, data, {headers: this._headers});
        break;
      }
    }

    return req.pipe(
      catchError(err => {
        if(this._verbose) {
          console.log("*** HTTP error" +
                      "\nStatus:" + err.status +
                      "\nurl:" + url);
        }
        return of(null);
      }),
      map(response => {
        if(this._verbose && response) {
          console.log("*** HTTP response received" +
                    "\nurl:" + url +
                    "\nResponse:" + JSON.stringify(response));
        }
        if(response?.access_token) {
          this._token = response.access_token;
          this._headers = new HttpHeaders().set('Authorization', "Bearer " + this._token);
        }
        return(response);
      }),
      share()
    );
  }
}
