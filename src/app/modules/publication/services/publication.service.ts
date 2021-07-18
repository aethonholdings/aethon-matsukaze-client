import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Publication } from 'src/app/model/model';
import { ApiService } from 'src/app/services/api/api.service';
import * as apiJson from './publication.endpoints.json'

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private _endpoints: any = apiJson["default"];

  constructor(private apiService: ApiService) { }

  get$(ids: number[]): Observable<Publication[]> {
    return this.apiService.request$(this._endpoints.actions.publication.get, ids);
  }

}
