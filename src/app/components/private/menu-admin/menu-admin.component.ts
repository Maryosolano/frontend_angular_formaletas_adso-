import { Component } from '@angular/core';
import { NavbarComponent } from "../../global/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FooterComponent } from "../../global/footer/footer.component";

@Component({
  selector: 'app-menu-admin',
  imports: [NavbarComponent, RouterLink, RouterModule, CommonModule, FooterComponent],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.scss'
})
export class MenuAdminComponent {

}
