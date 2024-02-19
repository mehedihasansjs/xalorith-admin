export class LoginRequest {
  username: string = '';
  password: string = '';
  grant_type: string = 'password';
  client_id: string = '';
  client_secret: string = '';
}
