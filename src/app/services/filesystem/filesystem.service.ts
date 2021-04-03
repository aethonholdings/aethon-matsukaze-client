import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesystemService {

  private _filesystemPath: string;
  private _storage = window.localStorage;

  constructor() { }

  getPath(): string { return this._filesystemPath; }

  public async initialise(): Promise<boolean> {
    return(true);
  }

  writeFile(path: string, filename: string, blob: any, params: any): Promise<boolean> {
    return new Promise<boolean>((resolve) => { resolve(true); })
  }
}
