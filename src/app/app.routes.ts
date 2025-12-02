import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/credenciales/login/login.component';
import { RegistroComponent } from './components/credenciales/registro/registro.component';
import { ServiciosComponent } from './components/public/servicios/servicios.component';
import { NosotrosComponent } from './components/public/nosotros/nosotros.component';
import { ContactoComponent } from './components/public/contacto/contacto.component';
import { MenuAdminComponent } from './components/private/menu-admin/menu-admin.component';
import { loginGuard } from './guards/login.guard';
import { ListarUsuariosComponent } from './components/private/menu-admin/listar-usuarios/listar-usuarios.component';
import { CrearUsuarioComponent } from './components/private/menu-admin/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './components/private/menu-admin/editar-usuario/editar-usuario.component';


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
  {
    path: 'admin',
    canActivate: [loginGuard],
    component: MenuAdminComponent
  },
  {
    path: 'admin/listar-usuarios',
    canActivate: [loginGuard],
    component: ListarUsuariosComponent
  },
  {
    path: 'admin/crear-usuario',
    canActivate: [loginGuard],
    component: CrearUsuarioComponent
  },
  {
    path: 'admin/editar-usuario/:id',
    canActivate: [loginGuard],
    component: EditarUsuarioComponent
  }
];
