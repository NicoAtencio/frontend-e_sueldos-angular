import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-eliminar-usuario-dialog',
  templateUrl: './eliminar-usuario-dialog.component.html',
  styleUrls: ['./eliminar-usuario-dialog.component.css']
})
export class EliminarUsuarioDialogComponent {

  errorAlEliminar: boolean = false;
  cargando: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EliminarUsuarioDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data:any,
    private _httpUsuario: UserService
  ) {}

  siEliminar(): void{
    this.cargando = true;
    this.errorAlEliminar = false;
    this._httpUsuario.eliminarusuario().subscribe({
      next: (res: any) => {
        this.cargando = false;
        this.dialogRef.close(true);
      },
      error: (error: any) => {
        this.errorAlEliminar = true
        this.cargando = false;
      }
    })
  }

  noEliminar(): void {
    this.errorAlEliminar = false;
    this.dialogRef.close(false);
  }
}
