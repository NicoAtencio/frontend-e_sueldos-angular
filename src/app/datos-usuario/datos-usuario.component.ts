import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IDatosUsuarios } from '../models/datos-usuarios.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit{
  nombre?: string;
  email?: string;

  constructor(private _httpUser: UserService, private router: Router) {}
  ngOnInit(): void {
    this.nombre = this._httpUser.getNombre();
    this.email = this._httpUser.getEmail();
    if (!this.nombre || !this.email) {
      this.router.navigate(['/'])
    }
  }
}
