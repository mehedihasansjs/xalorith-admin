import { Injectable, signal, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthManager {
  private _isAuthenticated: WritableSignal<boolean> = signal<boolean>(false);

  public get isAuthenticated(): Signal<boolean> {
    return this._isAuthenticated.asReadonly();
  }

  public set isAuthenticated(isAuthenticated: boolean) {
    this._isAuthenticated.set(isAuthenticated);
  }
}
