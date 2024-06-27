import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { IDatosUsuarios } from '../models/datos-usuarios.model';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit{
  nombre?: string
  nuevo?: boolean
  cargar: boolean = false
  constructor(
    private _http: AuthService,
    private route: ActivatedRoute, 
    private router: Router,
    private _usuarioHttp: UserService
  ) {}

  ngOnInit(): void {
    this.cargar = true;
    if (this._http.getToken()) {
      this._usuarioHttp.verDatos().subscribe({
        next : (data:IDatosUsuarios) => {
          this.nombre = data.name;
          this._usuarioHttp.setNombre(this.nombre);
          this._usuarioHttp.setEmail(data.email);
          this._usuarioHttp.setBarraNavegacion(true);
          this.cargar = false
        },
        error: (error:any) => {
          this.cargar = false
          this._usuarioHttp.limpiarToken();
          this._usuarioHttp.setBarraNavegacion(false);
          this.router.navigate(['/login']);
        }
      })
    } else {
      this.router.navigate(['/login']);
    }
  }
}
