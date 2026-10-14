
import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-signin',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
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

    const { email, password, rememberMe } =
      this.loginForm.getRawValue();

    this.authService.login({ email, password }).subscribe({

      // next: (response) => {

      //   if (!response.token) {
      //     this.errorMessage =
      //       'Login succeeded, but no authentication token was returned.';
      //     this.isSubmitting = false;
      //     return;
      //   }

      //   // Remove any token from a previous login.
      //   localStorage.removeItem('token');
      //   sessionStorage.removeItem('token');

      //   // Keep the user signed in based on their selection.
      //   const storage = rememberMe
      //     ? localStorage
      //     : sessionStorage;

      //   storage.setItem('token', response.token);

      //   // Navigate after successful authentication.
      //   this.router.navigate(['/dashboard']);
      // },

      next: (token) => {

        if (!token) {
          this.errorMessage = 'No authentication token was returned.';
          this.isSubmitting = false;
          return;
        }
      
        // Clear any previous token.
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      
        const storage = rememberMe
          ? localStorage
          : sessionStorage;
      
        // Store the raw JWT string.
        storage.setItem('token', token);
      
        // Redirect to dashboard.
        this.router.navigate(['/dashboard']);
    },

      error: (error) => {

        console.error('Login failed:', error);

        this.errorMessage =
          error?.error?.message ||
          'Invalid email or password. Please try again.';

        this.isSubmitting = false;
      }
    });
  }
}
