import { Component } from '@angular/core';
import { HeaderComponent } from '../global/header/header.component';
import { NavbarComponent } from "../global/navbar/navbar.component";
import { FooterComponent } from '../global/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  beneficios: any[] = [
    {
      descripcion: 'Reducción de Costos',
      detalle: 'Minimiza desperdicios y optimiza materiales'
    },
    {
      descripcion: 'Cumplimiento de Plazos',
      detalle: 'Evita retrasos y penalizaciones'
    },
    {
      descripcion: 'Seguridad Laboral',
      detalle: 'Disminuye riesgos y protege a tu equipo'
    },
    {
      descripcion: 'Calidad de Acabados',
      detalle: 'Estructuras resistentes y de larga durabilidad'
    }
  ];


}
