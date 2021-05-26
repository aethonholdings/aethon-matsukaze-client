import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class ValidateService {

  constructor() { }

  public validateParams(params: any): string {
    if(params.email && params.password) {
      if(params?.verifyPassword) { return this.comparePasswords(params); }
      return null;
    }
    return "auth.widgets.password.noCredentials";
  }

  public comparePasswords(params: any): string {
    if(params.password != params.verifyPassword) return "auth.widgets.password-checker.noMatch";
    if(params.password.length<8) return "auth.widgets.password-checker.length";
    return null;
  }
}
