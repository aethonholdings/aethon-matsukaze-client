import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilesystemService } from '../filesystem/filesystem.service';
import { Cacheable, CacheableLocation } from './persistence.model';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  private _verbose: boolean = true;
  private _storage = window.localStorage;

  constructor(private filesystemService: FilesystemService) { }

  public initialise(verbose: boolean): boolean {
    this._verbose = verbose;
    return true;
  }

  public clear$(): Observable<boolean> {
    this._storage.clear();
    return of(true);
  }

  public store$(endpoint: any, params: any, obj: any, blob?: Blob): Observable<Cacheable<any>> {
    let cacheable: Cacheable<any> = {
      location: null,
      key: this._endpointToString(endpoint),
      params: params,
      size: 0,
      progress: 0,
      object: obj
    }

    if(!blob) {
      cacheable.location = CacheableLocation.CACHED;
      cacheable.progress = 100;
      this._storage.setItem(cacheable.key, JSON.stringify(cacheable))
      if(this._verbose) {
        console.log("*** Object storage completed" +
                    "\nKey:" + cacheable.key +
                    "\nData:" + JSON.stringify(cacheable))
      }
    } else {

    }
    return of(cacheable);
  }

  public retrieve$(endpoint: any, suppressLog?: boolean): Observable<Cacheable<any>> {
    let cacheable: any = this._storage.getItem(this._endpointToString(endpoint));
    if(this._verbose && !suppressLog) {
      console.log("*** Object retrieval completed" +
                  "\nKey:" + this._endpointToString(endpoint) +
                  "\nData:" + JSON.stringify(cacheable));
    }
    return of(JSON.parse(cacheable));
  }

  private _endpointToString(endpoint: any): string {
    return endpoint.method + " " + endpoint.endpoint
  }

}
