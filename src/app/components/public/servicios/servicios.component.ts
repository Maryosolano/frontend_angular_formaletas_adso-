import { Component } from '@angular/core';
import { FooterComponent } from '../../global/footer/footer.component';
import { HeaderComponent } from '../../global/header/header.component';
import { NavbarComponent } from '../../global/navbar/navbar.component';


@Component({
  selector: 'app-servicios',
  imports: [ HeaderComponent, NavbarComponent, FooterComponent ],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss'
})
export class ServiciosComponent {

}
