
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  roleId: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginResponse {
  message: string;
  csrfToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = 'https://localhost:7067/api/Auth';

  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.apiUrl}/register`,
      request
    );
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      request
    );
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/logout`,
      {}
    );
  }
}
