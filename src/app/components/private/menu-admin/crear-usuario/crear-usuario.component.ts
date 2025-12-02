import { Component } from '@angular/core';
import { NavbarComponent } from "../../../global/navbar/navbar.component";
import { FooterComponent } from "../../../global/footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CredencialesService } from '../../../../services/credenciales.service';
import { GeneralService } from '../../../../services/general.service';

@Component({
  selector: 'app-crear-usuario',
  imports: [ CommonModule, FormsModule, NavbarComponent, FooterComponent, RouterLink, RouterModule, ReactiveFormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.scss'
})
export class CrearUsuarioComponent {

  formCrearUsuario: any = FormGroup;
  listaPerfiles: any = [];
  listaTiposDocumento: any = [];
  user: any = {
    nombres: '',
    tipo_documento_id: '',    
    num_documento: '',
    email: '',
    id_perfil: '',
    contrasena: ''
  };

  constructor(
    private fb: FormBuilder, /* creacion de fomulario reactivo */
    private credencialesService: CredencialesService,
    private generalService: GeneralService,
    private router: Router,
  ) {
    this.crearFormulario(); /*llamado inicial a la funcion para inicializar el formulario*/
    this.cargaListas();
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.formCrearUsuario = this.fb.group({
      nombre: ['', [Validators.required]],
      tipo_documento_id: ['', [Validators.required]],
      num_documento: ['', [Validators.required, Validators.minLength(5)]],
      id_perfil: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/)]],
       /* se valida que tenga minimo 5 caracteres */
      contrasena: ['', [Validators.required, Validators.minLength(5)]],
    })
    console.log(this.formCrearUsuario
      .value);
  }

  cargaListas() {
    // cargar listas necesarias (perfiles, tipos documento, etc.) si es necesario
    this.credencialesService.getAllPerfiles().subscribe((resp: any) => {
      this.listaPerfiles = resp.perfil;
    }, (error) => {
      console.error('Error cargando perfiles:', error);
    });
    this.credencialesService.getAllTiposDocumento().subscribe((resp: any) => {
      this.listaTiposDocumento = resp.Tipodocumento;
    }, (error) => {
      console.error('Error cargando tipos:', error);
    });
  }

  guardarCambios() {
    if(this.formCrearUsuario.invalid){
      return Object.values(this.formCrearUsuario
        .controls).forEach((control: any) => {
        /* marca todos los campos como tocados para que se muestren los mensajes de error */
        control.markAsTouched(); 
      }); 
    }   
    this.credencialesService.createUser( this.user ).subscribe((resp: any) => {
      this.generalService.showAlert('Éxito', 'Usuario creadoo correctamente.', 'success');
      this.router.navigate(['/admin/listar-usuarios']);
    }, (error) => {
      console.error('Error actualizando usuario:', error);
    });
  }
}
