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

  public store$(endpoint: any, obj: any, blob?: Blob): Observable<Cacheable<any>> {
    let cacheable: Cacheable<any> = {
      location: null,
      key: this._endpointToString(endpoint),
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
      // writePromise = new Promise<Cacheable<Asset>>((resolve, reject) => {
      //   let path: string, filename: string;
      //   if(this.browserTest) path = "../../assets/imgs/test/"; else path = this.path;
      //   filename = cacheable.object.id + ".jpg";
      //   cacheable.location = CacheableLocation.CACHED;
      //   cacheable.size = blob.size;
      //   cacheable.progress = 100;
      //   cacheable.object.uri = path + filename;
      //   this.store(cacheable).then(result => {
      //     if(this.browserTest) {
      //       if(this.verbose) {
      //         console.log("*** File storage completed: " +
      //                     "\nFilename:" + filename +
      //                     "\n(No cordova, mock write)");
      //       }
      //       resolve(cacheable);
      //     } else {
      //       this.filesystemService.writeFile(path, filename, blob, {replace:true}).then(result => {
      //         if(this.verbose) {
      //           console.log("*** File storage completed: " + cacheable.object.uri);
      //         }
      //         resolve(cacheable);
      //       })
      //     }
      //   }).catch(error => {
      //     reject(new Error("Could not persist file: " + filename));
      //   });
      // });
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
  //
  // storeAsset(cacheable: Cacheable<Asset>, data: Blob): Promise<Cacheable<Asset>> {
  //   let writePromise = new Promise<Cacheable<Asset>>((resolve, reject) => {
  //     let path, filename: string;
  //     if(this.browserTest) path = "../../assets/imgs/test/"; else path = this.path;
  //     filename = cacheable.object.id + ".jpg";
  //     cacheable.location = CacheableLocation.CACHED;
  //     cacheable.size = data.size;
  //     cacheable.progress = 100;
  //     cacheable.object.uri = path + filename;
  //     this.store(cacheable).then(result => {
  //       if(this.browserTest) {
  //         if(this.verbose) {
  //           console.log("*** File storage completed: " +
  //                       "\nFilename:" + filename +
  //                       "\n(No cordova, mock write)");
  //         }
  //         resolve(cacheable);
  //       } else {
  //         this.filesystemService.writeFile(path, filename, data, {replace:true}).then(result => {
  //           if(this.verbose) {
  //             console.log("*** File storage completed: " + cacheable.object.uri);
  //           }
  //           resolve(cacheable);
  //         })
  //       }
  //     }).catch(error => {
  //       reject(new Error("Could not persist file: " + filename));
  //     });
  //   });
  //   return writePromise;
  // }

  private _endpointToString(endpoint: any): string {
    return endpoint.method + " " + endpoint.endpoint
  }

}
