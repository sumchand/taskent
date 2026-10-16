
import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CsrfTokenService } from '../../services/csrf-token.service';

@Component({
  standalone: true,
  selector: 'app-signin',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private csrfService = inject(CsrfTokenService);
  private router = inject(Router);

  isSubmitting = false;
  errorMessage = '';

  loginForm = this.fb.nonNullable.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  onSubmit(): void {
    if (this.loginForm.invalid || this.isSubmitting) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const { email, password } =
      this.loginForm.getRawValue();

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        if (!response.csrfToken) {
          this.errorMessage =
            'Login succeeded, but the CSRF token was not returned.';
          this.isSubmitting = false;
          return;
        }

        // Keep the CSRF token in memory.
        this.csrfService.setToken(response.csrfToken);

        // No JWT storage in localStorage or sessionStorage.
        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        console.error('Login failed:', error);

        this.errorMessage =
          error?.error?.message ||
          'Invalid email or password. Please try again.';
      },

      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
