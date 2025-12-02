import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { NavbarComponent } from "../../../global/navbar/navbar.component";
import { FooterComponent } from "../../../global/footer/footer.component";
import { CredencialesService } from '../../../../services/credenciales.service';
import { GeneralService } from '../../../../services/general.service';

@Component({
  selector: 'app-editar-usuario',
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent, RouterLink, RouterModule, ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent implements OnInit {

  formEditarUsuario: any = FormGroup;
  userId: string | null = null;
  user: any = [];
  listaUsuarios: any = [];
  listaPerfiles: any = [];
  listaTiposDocumento: any = [];

  constructor(
    private fb: FormBuilder, /* creacion de fomulario reactivo */
    private route: ActivatedRoute,
    private credencialesService: CredencialesService,
    private generalService: GeneralService,
    private router: Router,
  ) {
    this.crearFormulario(); /*llamado inicial a la funcion para inicializar el formulario*/
    this.cargaListas();
  }

  ngOnInit(): void {
    // leer parámetro de ruta /admin/editar-usuario/:id
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('Editar usuario id:', this.userId);
    this.listaUsuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (this.userId) {
      if (Array.isArray(this.listaUsuarios)) {
        this.user = this.listaUsuarios.find((u: any) => String(u.id) === String(this.userId));
      }
      console.log('Usuario a editar:', this.user);
    }
    this.cargarDatos();
  }

  crearFormulario() {
    this.formEditarUsuario = this.fb.group({
        nombre: ['', [Validators.required]],
        tipo_documento_id: ['', [Validators.required]],
        num_documento: ['', [Validators.required, Validators.minLength(5)]],
        id_perfil: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/)]],
      })
    console.log(this.formEditarUsuario.value);
  }

  cargarDatos() {
    this.formEditarUsuario.setValue({
      nombre: this.user.nombre || '',
      tipo_documento_id: this.user.tipo_documento_id || '',
      num_documento: this.user.num_documento || '',
      id_perfil: this.user.id_perfil || '',
      email: this.user.email || ''
    });
  }

  cargaListas() {
    // cargar listas necesarias (perfiles, tipos documento, etc.) si es necesario
    this.credencialesService.getAllPerfiles().subscribe((resp: any) => {
      console.log('Perfiles cargados:', resp);
      this.listaPerfiles = resp.perfil;
    }, (error) => {
      console.error('Error cargando perfiles:', error);
    });
    this.credencialesService.getAllTiposDocumento().subscribe((resp: any) => {
      console.log('Tipos documentos:', resp);
      this.listaTiposDocumento = resp.Tipodocumento;
    }, (error) => {
      console.error('Error cargando tipos:', error);
    });
  }

  guardarCambios() {
    if(this.formEditarUsuario.invalid){
      return Object.values(this.formEditarUsuario
        .controls).forEach((control: any) => {
        /* marca todos los campos como tocados para que se muestren los mensajes de error */
        control.markAsTouched(); 
      }); 
    } 
    // lógica para guardar los cambios del usuario
    this.credencialesService.updateUser(this.user.id, this.user).subscribe((resp: any) => {
      this.generalService.showAlert('Éxito', 'Usuario actualizado correctamente.', 'success');
      this.router.navigate(['/admin/listar-usuarios']);
    }, (error) => {
      console.error('Error actualizando usuario:', error);
    });
  }

}
