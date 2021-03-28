import { Injectable } from '@angular/core';
import { FilesystemService } from '../filesystem/filesystem.service';
import { Asset, Cacheable, CacheableLocation } from './persistence.model';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  path: string = "/";
  verbose: boolean = true;
  browserTest: boolean = false;
  storage: any;

  constructor(private filesystemService: FilesystemService) {
    this.storage = window.localStorage
  }

  initialise(): Promise<any> {
    return new Promise((resolve, reject) =>
      this.storage.ready().then(() => {this.path = this.filesystemService.getDataDirectory(); resolve(true)}).catch(() => reject(new Error("Could not initialise local storage"))));
  }

  logout(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.storage.clear().then((nothing: any) => resolve(true)).catch((error: any) => reject (new Error("Could not clear local storage")));
    });
  }

  store(cacheable: Cacheable<any>, blob?: Blob): Promise<Cacheable<any>> {
    let writePromise: Promise<any>;

    if(!blob) {
      writePromise = new Promise<any>((resolve, reject) => {
        cacheable.location = CacheableLocation.CACHED;
        cacheable.progress = 100;
        this.storage.set(cacheable.key, cacheable).then((data: { key: string; }) => {
          if(this.verbose) {
            console.log("*** Object storage completed" +
                        "\nKey:" + data.key +
                        "\nData:" + JSON.stringify(data))
          };
          resolve(data);
        }).catch((error: any) => {
          reject (new Error("Could not persist key: " + cacheable.key + ", data: " + cacheable ))
        });
      });
    } else {
      writePromise = new Promise<Cacheable<Asset>>((resolve, reject) => {
        let path: string, filename: string;
        if(this.browserTest) path = "../../assets/imgs/test/"; else path = this.path;
        filename = cacheable.object.id + ".jpg";
        cacheable.location = CacheableLocation.CACHED;
        cacheable.size = blob.size;
        cacheable.progress = 100;
        cacheable.object.uri = path + filename;
        this.store(cacheable).then(result => {
          if(this.browserTest) {
            if(this.verbose) {
              console.log("*** File storage completed: " +
                          "\nFilename:" + filename +
                          "\n(No cordova, mock write)");
            }
            resolve(cacheable);
          } else {
            this.filesystemService.writeFile(path, filename, blob, {replace:true}).then(result => {
              if(this.verbose) {
                console.log("*** File storage completed: " + cacheable.object.uri);
              }
              resolve(cacheable);
            })
          }
        }).catch(error => {
          reject(new Error("Could not persist file: " + filename));
        });
      });
    }
    return writePromise
  }

  retrieve(key: string, suppressLog?: boolean): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.storage.get(key).then((data) => {
        if(this.verbose && !suppressLog) {
          console.log("*** Object retrieval completed" +
                      "\nKey:" + key +
                      "\nData:" + JSON.stringify(data));
        };
        resolve(data);
      }).catch(error => {
        reject(new Error("Could not retrieve key: " + key))
      });
    });
  }

  storeAsset(cacheable: Cacheable<Asset>, data: Blob): Promise<Cacheable<Asset>> {
    let writePromise = new Promise<Cacheable<Asset>>((resolve, reject) => {
      let path, filename: string;
      if(this.browserTest) path = "../../assets/imgs/test/"; else path = this.path;
      filename = cacheable.object.id + ".jpg";
      cacheable.location = CacheableLocation.CACHED;
      cacheable.size = data.size;
      cacheable.progress = 100;
      cacheable.object.uri = path + filename;
      this.store(cacheable).then(result => {
        if(this.browserTest) {
          if(this.verbose) {
            console.log("*** File storage completed: " +
                        "\nFilename:" + filename +
                        "\n(No cordova, mock write)");
          }
          resolve(cacheable);
        } else {
          this.filesystemService.writeFile(path, filename, data, {replace:true}).then(result => {
            if(this.verbose) {
              console.log("*** File storage completed: " + cacheable.object.uri);
            }
            resolve(cacheable);
          })
        }
      }).catch(error => {
        reject(new Error("Could not persist file: " + filename));
      });
    });
    return writePromise;
  }

}
