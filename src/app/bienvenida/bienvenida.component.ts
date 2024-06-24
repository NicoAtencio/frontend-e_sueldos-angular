import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit{
  nombre?: string
  nuevo?: boolean
  constructor(private _http: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    //Esto trae un objeto donde lo que importa es el sub ya que es el id del usuario.
    // const token =this._http.getToken();
    // if (token) {
    //   console.log(jwtDecode(token));
    // }
    this.route.queryParams.subscribe(params => {
      this.nombre = params['name'] || '';
      this.nuevo = params['login'] ? false : true;
    })
  }

}
