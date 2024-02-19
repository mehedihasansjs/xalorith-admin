import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenManager {
  private _token: string = '';

  set token(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
    this._token = token;
  }

  get token(): string {
    return this._token;
  }

  hasToken(): boolean {
    return !!this._token;
  }
}
