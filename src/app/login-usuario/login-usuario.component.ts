import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent {

  formularioLogin: FormGroup;
  cargando: boolean = false;

  constructor (private form: FormBuilder) {
    this.formularioLogin = this.form.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }
  ingresar(): void {
    if (this.formularioLogin.valid) {
      // Simula que envia la informacion a la API y espera una respuesta
      this.cargando = true;
    } else {
      this.cargando = false;
    }
  }

  tieneErrores(controlName: string, errorRequerido: string): boolean | undefined{
    return this.formularioLogin.get(controlName)?.hasError(errorRequerido) && this.formularioLogin.get(controlName)?.touched;
  }

}
