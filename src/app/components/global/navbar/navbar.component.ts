import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  estaActivo = false;
  isLoggedIn: boolean = false;
   constructor() {
    this.validarLogin();
   }

  mostrar_items(){
    this.estaActivo = !this.estaActivo;
  }

  validarLogin(){
    const generalService = inject(GeneralService);
    const token = localStorage.getItem('token');
    const isvalid = generalService.isAuthenticated();
  
    if (token && isvalid) {
      // token presente y no expirado: permitir acceso
      this.isLoggedIn = true;
      console.log('login navbar', this.isLoggedIn);
      
    } else {
      this.isLoggedIn = false;
    }  
  }

  salir(){
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    console.log('logout navbar', this.isLoggedIn);
  }
}
