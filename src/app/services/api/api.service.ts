import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Act, Beat, DialogueLine, I18nBundle, I18nBundleElement, MatsukazeError, MatsukazeObjectTypes, Moment, MomentSequence, Scene, SceneSequence, Story, User } from 'src/app/model/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _root: string;
  private _verbose: boolean;
  private _headers: HttpHeaders;
  private _token: string = null;

  constructor(private http: HttpClient) { }

  public initialise(root: string, verbose: boolean): boolean {
    this._root = root;
    this._verbose = verbose;
    this._token = null;
    this._headers = null;
    return true
  }

  public isAuthenticated(): boolean { if(this._token) return true; else return false }

  public logout(): boolean { return this.setToken(null) }

  public request$(action: any, data?: any, blob?: boolean): Observable<any> {
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
      case "GET" : {
        if(blob) req = this.http.get(url, {params: data, headers: this._headers, responseType: 'blob'});
        else req = this.http.get(url, {params: data, headers: this._headers});
        break;
      }
      case "POST" : {
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
        return(response);
      }),
      map(response => {
        return this._dtoFactory(response.matsukazeObjectType, response);
      }),
      share()
    );
  }

  public setToken(token: string): boolean {
    this._token = token;
    this._headers = new HttpHeaders().set('Authorization', "Bearer " + this._token);
    return true;
  }

  private _dtoFactory(dtoType: MatsukazeObjectTypes, json: any): any {
    var obj: any;
    switch(dtoType) {
      case(MatsukazeObjectTypes.error): {
        obj = new MatsukazeError(json);
        break;
      }
      case(MatsukazeObjectTypes.user): {
        obj = new User(json);
        break;
      }
      case(MatsukazeObjectTypes.story): {
        obj = new Story(json);
        break;
      }
      case(MatsukazeObjectTypes.act): {
        obj = new Act(json);
        break;
      }
      case(MatsukazeObjectTypes.sceneSequence): {
        obj = new SceneSequence(json);
        break;
      }
      case(MatsukazeObjectTypes.scene): {
        obj = new Scene(json);
        break;
      }
      case(MatsukazeObjectTypes.beat): {
        obj = new Beat(json);
        break;
      }
      case(MatsukazeObjectTypes.momentSequence): {
        obj = new MomentSequence(json);
        break;
      }
      case(MatsukazeObjectTypes.moment): {
        obj = new Moment(json);
        break;
      }
      case(MatsukazeObjectTypes.dialogueLine): {
        obj = new DialogueLine(json);
        obj.i18nBundle = new I18nBundle(json.i18nBundle);
        for(let element in json.i18nBundle.i18nBundleElements) {
          obj.i18nBundle[element]= new I18nBundleElement(json.i18nBundle.i18nBundleElements[element]);
        }
        obj.children$ = null;
        obj.children = [];
        break;
      }
    }
    return obj;
  }
}
