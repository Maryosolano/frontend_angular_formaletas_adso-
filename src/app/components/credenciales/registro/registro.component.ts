import { Component } from '@angular/core';
import { HeaderComponent } from '../../global/header/header.component';
import { NavbarComponent } from '../../global/navbar/navbar.component';

@Component({
  selector: 'app-registro',
  imports: [HeaderComponent, NavbarComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

}
