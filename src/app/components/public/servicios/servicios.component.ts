import { Component } from '@angular/core';
import { FooterComponent } from '../../global/footer/footer.component';
import { NavbarComponent } from '../../global/navbar/navbar.component';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-servicios',
  imports: [NavbarComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss'
})
export class ServiciosComponent {

  servicios = [
    {  
      img: 'assets/img/servicio1.jpg', 
    },
    {      
      img: 'assets/img/servicio2.jpg',       
    },
    {      
      img: 'assets/img/servicio3.jpg',      
    },
    {       
      img: 'assets/img/servicio4.jpg',     
    }
  ];

  transportes = [
    {  
      img: 'assets/img/transporte1.jpg', 
    },
    {      
      img: 'assets/img/transporte2.jpg',       
    },
    {      
      img: 'assets/img/transporte3.jpg',      
    },
    {       
      img: 'assets/img/transporte4.jpg',     
    }
  ];

  otros = [
    {  
      img: 'assets/img/otros1.jpg', 
    },
    {      
      img: 'assets/img/otros2.jpg',       
    },
    {      
      img: 'assets/img/otros3.jpg',      
    },
    {       
      img: 'assets/img/otros4.jpg',     
    }
  ];

}
