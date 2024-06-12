import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  cargando: boolean = false;
  formularioRegistro: FormGroup;

  constructor(private form: FormBuilder) {
    this.formularioRegistro = this.form.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  tieneErrores(controlName: string, errorRequerido: string): boolean | undefined {
    return this.formularioRegistro.get(controlName)?.hasError(errorRequerido) && this.formularioRegistro.get(controlName)?.touched;
  }

  registrar(): void {
    if (this.formularioRegistro.valid) {
      // Simula que envia los datos a la API y esta a la espera de la respuesta
      this.cargando = true;
    } else {
      this.cargando = false;
    }
  }
}
