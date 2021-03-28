import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesystemService {

  private _dataDirectory: string = "/";

  constructor() { }

  getDataDirectory(): string { return this._dataDirectory; }

  writeFile(path: string, filename: string, blob: any, params: any): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      resolve(true);
    })
  }
}
