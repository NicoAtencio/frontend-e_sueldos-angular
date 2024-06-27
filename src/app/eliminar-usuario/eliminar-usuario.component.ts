import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EliminarUsuarioDialogComponent } from '../eliminar-usuario-dialog/eliminar-usuario-dialog.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css']
})
export class EliminarUsuarioComponent implements OnInit{

  nombre?: string;
  email?: string;

  constructor (public dialog: MatDialog, private _httpUser: UserService, private router: Router) {

  }

  ngOnInit(): void {
    if (!this._httpUser.getNombre() || !this._httpUser.getEmail()) {
      this.router.navigate(['/']);
    } else {
      this.nombre = this._httpUser.getNombre();
      this.email = this._httpUser.getEmail();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EliminarUsuarioDialogComponent, {
      width: 'auto',
      data: {name: this.nombre, email: this.email}
    });

    dialogRef.afterClosed().subscribe(result => {
      // En caso de que se elimine correctamente el usuario result es true
      if (result) {
        this.router.navigate(['/'])
      } 
    })
  }
}
