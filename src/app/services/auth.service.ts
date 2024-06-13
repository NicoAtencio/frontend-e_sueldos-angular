import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuarioCompleto } from '../models/usuario-completo.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/v1/auth';
  private tokenKey = 'authToken'

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string): Observable<any> {
    const body = {
      name: name,
      email: email,
      password: password
    }
    return this.http.post<IUsuarioCompleto>(`${this.apiUrl}/register`, body);
  }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    }
    return this.http.post<IUsuarioCompleto>(`${this.apiUrl}/login`, body);
  }

  setToken(token: string): void{ 
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
