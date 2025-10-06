import { Component } from '@angular/core';
import { HeaderComponent } from '../../global/header/header.component';
import { NavbarComponent } from '../../global/navbar/navbar.component';
import { FooterComponent } from '../../global/footer/footer.component';

@Component({
  selector: 'app-nosotros',
  imports: [ HeaderComponent, NavbarComponent, FooterComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss'
})
export class NosotrosComponent {

}
