import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';

const routes: Routes = [
  {path: "", component: LoginUsuarioComponent},
  {path: "registro", component: RegistroUsuarioComponent},
  {path: "bienvenida", component: BienvenidaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
