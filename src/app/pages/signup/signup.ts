// import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';

// @Component({
//   standalone: true,
//   selector: 'app-signup',
//   imports: [RouterLink],
//   templateUrl: './signup.html',
//   styleUrl: './signup.css',
// })
// export class Signup {}
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  registerForm = this.fb.nonNullable.group({
    fullName: ['', Validators.required],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  });

  onSubmit(): void {

    console.log('Create account clicked');

    if (this.registerForm.invalid) {

      console.log('Form is invalid');
      console.log(this.registerForm.value);

      this.registerForm.markAllAsTouched();

      return;
    }

    console.log('Form is valid');

    const request = {
      ...this.registerForm.getRawValue(),
      roleId: 1
    };

    console.log('Request:', request);

    this.authService.register(request).subscribe({

      next: (response) => {

        console.log('Registration successful:', response);

        this.successMessage =
          'Registration successful!';

        this.registerForm.reset();

      },

      error: (error) => {

        console.error('Registration failed:', error);

        this.errorMessage =
          error?.error?.message ||
          'Registration failed.';
      }
    });
  }
}