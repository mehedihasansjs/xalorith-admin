import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthManager, ConfigManager, TokenManager } from '../../../../core';
import { LoginRequest, LoginSubmission } from '../models';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private _httpClient: HttpClient,
    private _configManager: ConfigManager,
    private _tokenManager: TokenManager,
    private _authManager: AuthManager
  ) { }

  login(submission: LoginSubmission) {
    const { username, password } = submission;

    if ( !username ) {
      throw new Error('Username is required');
    }

    if ( !password ) {
      throw new Error('Password is required');
    }

    const { clientId, clientSecret, baseUrl, endpoint } = this._configManager.config;

    if ( !clientId ) {
      throw new Error('Client ID is required');
    }

    if ( !clientSecret ) {
      throw new Error('Client Secret is required');
    }

    const request: LoginRequest = new LoginRequest();

    request.username = username;
    request.password = password;
    request.client_id = clientId;
    request.client_secret = clientSecret;

    const url: string = `${baseUrl}/${endpoint.auth.login}`;
    return this._httpClient.post<LoginResponse>(url, request)
      .pipe(
        tap((response: LoginResponse) => {
          this._tokenManager.token = response.token;
          this._authManager.isAuthenticated = true;
        })
      );
  }
}
