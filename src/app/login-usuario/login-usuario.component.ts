import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IUsuarioCompleto } from '../models/usuario-completo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent {

  formularioLogin: FormGroup;
  cargando: boolean = false;
  usuario?: IUsuarioCompleto;
  errorAlIngresar?: string | undefined;

  constructor (private form: FormBuilder, private _http: AuthService, private router: Router) {
    this.formularioLogin = this.form.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }
  ingresar(): void {
    if (this.formularioLogin.valid) {
      this.cargando = true;
      this._http.login(this.formularioLogin.value.email,this.formularioLogin.value.password).subscribe({
        next: (data: any) => {
          this.usuario = data;
          this.cargando = false;
          this._http.setToken(data.tokens.access.token);
          this.router.navigate([`/`], { queryParams: { name: data.user.name , login: true} })
        },
        error: (error: any) => {
          this.cargando = false;
          if (error.error.message = 'Incorrect email or password') {
            this.errorAlIngresar = 'Mail o contraseña no validos';
          } else {
            this.errorAlIngresar = 'Hubo un error al ingresar, por favor intentelo nuevamente';
          }
        }
      })
    } else {
      this.cargando = false;
    }
  }

  tieneErrores(controlName: string, errorRequerido: string): boolean | undefined{
    return this.formularioLogin.get(controlName)?.hasError(errorRequerido) && this.formularioLogin.get(controlName)?.touched;
  }

  quitarCartelError(): void {
    this.errorAlIngresar = undefined;
  }

}
