
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsrfTokenService {
  private csrfToken: string | null = null;

  setToken(token: string): void {
    this.csrfToken = token;
  }

  getToken(): string | null {
    return this.csrfToken;
  }

  clearToken(): void {
    this.csrfToken = null;
  }
}
