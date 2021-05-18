import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class ValidateService {

  constructor() { }

  public validateParams(params: any): string {
    if(params?.email && params?.password) {
      if(params?.verifyPassword) { return this.comparePasswords(params); }
      return null;
    }
    return "auth.error.noCredentials";
  }

  public comparePasswords(params: any): string {
    if(params?.password && params?.verifyPassword) {
      if(params.password != params.verifyPassword) return "auth.error.noMatch";
      if(params.password.length<8) return "auth.error.length";
    }
    return null;
  }

  public validateEmail(email: string): string {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if(re.test(email)) return null;
    return "auth.error.invalidEmail";
  }
}
