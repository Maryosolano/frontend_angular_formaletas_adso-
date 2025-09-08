import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/credenciales/login/login.component';
import { RegistroComponent } from './components/credenciales/registro/registro.component';


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
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'registro',
    component: RegistroComponent 
  },
];
