import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IUsuarioCompleto } from '../models/usuario-completo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  cargando: boolean = false;
  formularioRegistro: FormGroup;
  usuario?: IUsuarioCompleto;
  mailYaTieneUsuario?: string | undefined;

  constructor(private form: FormBuilder,
    private _http: AuthService,
    private router: Router
  ) {
    this.formularioRegistro = this.form.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
        ]
      ]
    })
  }

  tieneErrores(controlName: string, errorRequerido: string): boolean | undefined {
    return this.formularioRegistro.get(controlName)?.hasError(errorRequerido) && this.formularioRegistro.get(controlName)?.touched;
  }

  registrar(): void {
    if (this.formularioRegistro.valid) {
      this.cargando = true;
      this._http.register(this.formularioRegistro.value.name,
        this.formularioRegistro.value.email,
        this.formularioRegistro.value.password).subscribe({
          next: (data: any) => {
            this.usuario = data;
            this.cargando = false;
            this._http.setToken(data.tokens.access.token);
            this.router.navigate([`/`], { queryParams: { name: this.formularioRegistro.value.name } });
          },
          error: (error: any) => {
            this.cargando = false;
            if (error.error.message === 'Email already taken') {
              this.mailYaTieneUsuario = 'Ya existe un usuario con ese mail';
            } else {
              this.mailYaTieneUsuario = 'Hubo un error al registrar el usuario, por favor intentelo nuevamente';
            }
          }
        })
    } else {
      this.cargando = false;
    }
  }

  eliminarAdvertenciaMail(): void {
    this.mailYaTieneUsuario = undefined;
  }
}
