import { Component } from '@angular/core';


@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  estaActivo = false;

  mostrar_items(){
    this.estaActivo = !this.estaActivo;
  }

}
