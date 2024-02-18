import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthManager } from './core';
import { LoginComponent } from './features/auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected authenticated = this.authManager.isAuthenticated;

  constructor(
    private authManager: AuthManager,
    private matDialog: MatDialog
  ) {
    effect(() => {
      if (!this.authenticated()) {
        this.matDialog.open(LoginComponent);
      }
    });
  }
}
