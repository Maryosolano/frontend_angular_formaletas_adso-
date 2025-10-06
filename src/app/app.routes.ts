import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/credenciales/login/login.component';
import { RegistroComponent } from './components/credenciales/registro/registro.component';
import { ServiciosComponent } from './components/public/servicios/servicios.component';
import { NosotrosComponent } from './components/public/nosotros/nosotros.component';
import { ContactoComponent } from './components/public/contacto/contacto.component';


export const routes: Routes = [
    {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent 
  },
  {
    path: 'servicios',
    component: ServiciosComponent
  },
  {
    path: 'nosotros',
    component: NosotrosComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  {
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'registro',
    component: RegistroComponent 
  },
];
