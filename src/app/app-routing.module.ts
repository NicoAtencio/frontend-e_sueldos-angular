import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { DatosUsuarioComponent } from './datos-usuario/datos-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './eliminar-usuario/eliminar-usuario.component';

const routes: Routes = [
  {path: "login", component: LoginUsuarioComponent},
  {path: "registro", component: RegistroUsuarioComponent},
  {path: "", component: BienvenidaComponent},
  {path: "datosusuario", component: DatosUsuarioComponent},
  {path: "editarusuario", component: EditarUsuarioComponent},
  {path: "eliminarusuario", component: EliminarUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
