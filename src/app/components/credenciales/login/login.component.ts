import { Component } from '@angular/core';
import { HeaderComponent } from '../../global/header/header.component';
import { NavbarComponent } from '../../global/navbar/navbar.component';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
