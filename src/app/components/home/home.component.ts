import { Component } from '@angular/core';
import { NavbarComponent } from "../global/navbar/navbar.component";
import { FooterComponent } from '../global/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, FooterComponent, CommonModule],
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

  cards = [
    { 
      titulo: 'Experiencia Especializada.', 
      img: 'assets/img/formaleta1.jpg', 
      text: 'Te asesoramos en la elección, montaje y desmontaje de formaletas, optimizando recursos y evitando contratiempos.' 
    },
    { 
      titulo: 'Calidad Certificada.', 
      img: 'assets/img/formaleta2.jpg', 
      text: 'Solo manejamos equipos que cumplen con la normativa vigente y los estándares más exigentes de la industria.' 
    },
    { 
      titulo: 'Eficiencia Operativa.', 
      img: 'assets/img/formaleta3.jpg', 
      text: 'Implementamos cronogramas de entrega y recogida que se alinean con tus plazos de obra, garantizando continuidad en el proceso constructivo.' 
    },
    { 
      titulo: 'Acompañamiento Integral.', 
      img: 'assets/img/formaleta4.jpg', 
      text: 'Desde la planeación hasta la culminación, nuestro equipo técnico te brinda soporte constante para que cada etapa se desarrolle sin sorpresas.' 
    }
  ];

  flipped: boolean[] = this.cards.map(() => false);

  toggleFlip(i: number) {
    this.flipped[i] = !this.flipped[i];
  }



}
