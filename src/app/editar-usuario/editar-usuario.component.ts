import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { UserService } from '../services/user.service';
import { IDatosUsuarios } from '../models/datos-usuarios.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{
  formularioEdicion: FormGroup;
  mostrarError: boolean = false;
  modificado: boolean = false;
  errorDeContrasenia: boolean = false;
  cargando: boolean = false;

  constructor(private form: FormBuilder, private _httpUser: UserService, private router: Router) {
    this.formularioEdicion = this.form.group({
      name: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
    if (!this._httpUser.getNombre() || !this._httpUser.getEmail()) {
      this.router.navigate(['/'])
    }
  }

  editar(): void { 
    this.cargando = true;
    this.errorDeContrasenia = false;
    this.mostrarError = false;
    this.modificado = false;
    const obj: any = {};
    if (this.formularioEdicion.value.name) {
      obj.name = this.formularioEdicion.value.name;
    }
    if(this.formularioEdicion.value.password) {
      if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.formularioEdicion.value.password)) {
        obj.password = this.formularioEdicion.value.password;
      } else  {
        this.errorDeContrasenia = true;
        this.cargando = false;
        return;
      }

    }
    if (!obj) {
      this.cargando = false;
      return;
    }
    this._httpUser.editarDatos(obj).subscribe({
      next: (data: IDatosUsuarios) => {
        this._httpUser.setNombre(data.name);
        this.modificado = true;
        this.cargando = false;
      },
      error: (error: any) => {
        this.mostrarError = true;
        this.cargando = false;
      }
    })
  }
}
