import { Injectable, Signal, WritableSignal, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationManager {
    private _isAuthenticated: WritableSignal<boolean> = signal<boolean>(false);

    public get isAuthenticated(): Signal<boolean> {
        return this._isAuthenticated.asReadonly();
    }

    public set isAuthenticated(value: boolean) {
        this._isAuthenticated.set(value);
    }
}
