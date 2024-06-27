import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mostrarBarra: boolean = false;
  private mostrarBarraSusciption?: Subscription;

  constructor(private _httpUser: UserService) {

  }

  ngOnInit(): void {
    this.mostrarBarraSusciption = this._httpUser.barraNavegacion$.subscribe(mostrar => {
      this.mostrarBarra = mostrar;
    })
  }

  ngOnDestroy(): void {
    if (this.mostrarBarraSusciption) {
      this.mostrarBarraSusciption.unsubscribe();
    }
  }
}
