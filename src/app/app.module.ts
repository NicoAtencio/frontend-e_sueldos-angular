import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { LoginUsuarioComponent } from './login-usuario/login-usuario.component';
import { CreacionUsuarioComponent } from './creacion-usuario/creacion-usuario.component';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DatosUsuarioComponent } from './datos-usuario/datos-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './eliminar-usuario/eliminar-usuario.component';
import { EliminarUsuarioDialogComponent } from './eliminar-usuario-dialog/eliminar-usuario-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistroUsuarioComponent,
    LoginUsuarioComponent,
    CreacionUsuarioComponent,
    BienvenidaComponent,
    NavbarComponent,
    DatosUsuarioComponent,
    EditarUsuarioComponent,
    EliminarUsuarioComponent,
    EliminarUsuarioDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
