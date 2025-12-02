import { Component } from '@angular/core';
import { CredencialesService } from '../../../../services/credenciales.service';
import { FooterComponent } from "../../../global/footer/footer.component";
import { NavbarComponent } from "../../../global/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GeneralService } from '../../../../services/general.service';

@Component({
  selector: 'app-listar-usuarios',
  imports: [FooterComponent, NavbarComponent, CommonModule, RouterLink, RouterModule, FormsModule,],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.scss'
})
export class ListarUsuariosComponent {

  usuarios: any;
  perfiles: any;
  tiposDocumento: any;
  listaUsuarios: any;
  loading = true;

  constructor(
    private generalService: GeneralService,
    private credencialesService: CredencialesService,
  ) { }

  cargaPrevia() {
    // recarga la lista de usuarios desde el servicio
    this.loading = true;
    this.generalService.initListaUsuarios();
  }

  ngOnInit(): void {
    // suscribirse al observable del servicio
    this.generalService.listaUsuarios$.subscribe(list => {
      this.listaUsuarios = list;
      this.loading = false;
      localStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
    });

    // iniciar la carga (solo una vez)
    this.generalService.initListaUsuarios();
  }

  eliminarUsuario(id: number) {
    console.log('eliminar usuario con id:', id);
    this.generalService.showConfirm('¿Está seguro?', 'Esta acción no se puede deshacer.').then((result) => {
      if (result.isConfirmed) {
        this.procesarEliminacion(id);
      }
    });
  }

  procesarEliminacion(id: number) {
    this.credencialesService.deleteUser(id).subscribe((resp: any) => {
      this.generalService.showAlert('Éxito', 'Usuario eliminado correctamente.', 'success');
      this.cargaPrevia();
    }, (error: any) => {
        console.error('Error eliminando usuario:', error);
      });
  }
}
