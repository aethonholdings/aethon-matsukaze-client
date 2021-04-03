import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
      share()
    );
  }

  public setToken(token: string): boolean {
    this._token = token;
    this._headers = new HttpHeaders().set('Authorization', "Bearer " + this._token);
    return true;
  }
}
