import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { ILoginForm } from './interfaces';
import { LoginForm, LoginSubmission } from './models';
import { LoginService } from './services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<ILoginForm>;

  constructor(
    private formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _matDialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.getInitialForm();
  }

  private getInitialForm(): FormGroup<ILoginForm> {
    const loginForm: LoginForm = new LoginForm();

    return this.formBuilder.group<ILoginForm>({
      username: this.formBuilder.nonNullable.control<string>(loginForm.username, [Validators.required]),
      password: this.formBuilder.nonNullable.control<string>(loginForm.password, [Validators.required]),
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const value: LoginForm = this.loginForm.getRawValue();
    const submission: LoginSubmission = new LoginSubmission();
    submission.username = value.username;
    submission.password = value.password;

    this._loginService.login(submission)
      .pipe(
        tap((token: string) => this._matDialogRef.close(token))
      )
      .subscribe();
  }
}
