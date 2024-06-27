import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IDatosUsuarios } from '../models/datos-usuarios.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl =  'http://localhost:3000/v1/users';
  idUsuario?: string;
  private tokenKey = 'authToken';
  nombre?: string;
  email?: string;
  
  private mostrarBarraNavegacion = new BehaviorSubject<boolean>(false);
  barraNavegacion$ = this.mostrarBarraNavegacion.asObservable();

  constructor(private _http: HttpClient) { }

  private verHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    let header = new HttpHeaders();
    if (token) {
      this.idUsuario = jwtDecode(token).sub;
      header = header.set('Authorization', `Bearer ${token}`)
    }
    return header;
  }

  verDatos(): Observable<IDatosUsuarios> {
    const headers = this.verHeaders();
    return this._http.get<IDatosUsuarios>(`${this.apiUrl}/${this.idUsuario}`, {headers})
  }

  editarDatos(datos: any): Observable<IDatosUsuarios> {
    const headers = this.verHeaders();
    return this._http.patch<IDatosUsuarios>(`${this.apiUrl}/${this.idUsuario}`, datos, {headers})
  }

  eliminarusuario(): Observable<any> {
    const headers = this.verHeaders();
    return this._http.delete<any>(`${this.apiUrl}/${this.idUsuario}`, {headers})
  }

  limpiarToken(): any {
    localStorage.removeItem(this.tokenKey);
  }

  getNombre (): string | undefined {
    return this.nombre;
  }

  setNombre (valor: string | undefined): void {
    this.nombre = valor;
  }

  getEmail(): string | undefined {
    return this.email;
  }

  setEmail(mail: string | undefined): void {
    this.email = mail
  }

  setBarraNavegacion (valor: boolean) {
    this.mostrarBarraNavegacion.next(valor);
  }

  getBarraNavegacion (): boolean {
    return this.mostrarBarraNavegacion.value;
  }
}
