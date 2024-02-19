import { Component, effect, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';
import { AuthManager, ConfigManager, TokenManager } from './core';
import { IConfig } from './core/interfaces';
import { ConfigService } from './core/services/config.service';
import { LoginComponent } from './features/auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  protected authenticated = this._authManager.isAuthenticated;

  constructor(
    private _authManager: AuthManager,
    private _configService: ConfigService,
    private _configManager: ConfigManager,
    private _tokenManager: TokenManager,
    private _matDialog: MatDialog
  ) {
    effect(() => {
      if (!this.authenticated()) {
        const loginDialogRef: MatDialogRef<LoginComponent, any> = this._matDialog.open(LoginComponent, {
          hasBackdrop: false,
        });
      }
    });
  }

  ngOnInit() {
    this._configService
      .getConfig()
      .pipe(
        tap((config: IConfig) => {
          this._configManager.config = config;
          this._configManager.baseUrl = config.baseUrl;
          this._configManager.endpoint = config.endpoint;
        }),
        tap(() => {
          const token = localStorage.getItem('token');

          if ( !token ) {
            this._authManager.isAuthenticated = false;
            return;
          }

          this._tokenManager.token = JSON.parse(token);
          this._authManager.isAuthenticated = true;
        })
      )
      .subscribe();
  }

  hasToken(): boolean {
    return this._tokenManager.hasToken();
  }
}
