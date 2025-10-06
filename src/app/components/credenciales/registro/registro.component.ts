import { Component } from '@angular/core';
import { HeaderComponent } from '../../global/header/header.component';
import { NavbarComponent } from '../../global/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { FooterComponent } from '../../global/footer/footer.component';

@Component({
  selector: 'app-registro',
  imports: [HeaderComponent, NavbarComponent, FooterComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})

export class RegistroComponent {

  formRegistro: any = FormGroup;
  verTexto: boolean = false;
  
  roles: string[] = [];

  get nombreNoValido() {
    return this.formRegistro.get('nombre').invalid && this.formRegistro.get('nombre').touched;
  }
  get emailNoValido() {
    return this.formRegistro.get('email').invalid && this.formRegistro.get('email').touched;
  }
  get passwordNoValido() {
    return this.formRegistro.get('password').invalid && this.formRegistro.get('password').touched;
  }
  get telefonoNoValido() {
    return this.formRegistro.get('telefono').invalid && this.formRegistro.get('telefono').touched;
  }
  get rolNoValido() {
    return this.formRegistro.get('rol').invalid && this.formRegistro.get('rol').touched;
  }
  get terminosNoValido() {
    return this.formRegistro.get('terminos').invalid && this.formRegistro.get('terminos').touched;
  }

  public errorMessage = {
    nombre: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minlength', message: 'El nombre debe tener al menos 5 caracteres' }
    ],
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'pattern', message: 'El correo no es valido' }
    ],
    password: [
      { type: 'required', 
        message: 'La contrase;a es obligatoria' 
      },
      { type: 'pattern', 
        message: 'La contrase;a debe tener minimo 8 caracteres, entre ellos 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial' 
      }
    ],
    telefono: [
      { type: 'required', message: 'El telefono es obligatorio' },
      { type: 'pattern', message: 'El telefono debe tener 10 digitos' }
    ],
    rol: [
      { type: 'required', message: 'El rol es obligatorio' }  
    ],
    terminos: [
      { type: 'required', message: 'Debe aceptar los terminos y condiciones' }
    ]
  }

  constructor(
    private fb: FormBuilder, /* creacion de fomulario reactivo */
    private generalService: GeneralService /*inyeccion del servicio*/
  ) { 
    this.roles = this.generalService.getData();
    this.crearFormulario(); /*llamado inicial a la funcion para inicializar el formulario*/
  }

  ngOnInit(): void {
    
    console.log(this.roles);
  }

  crearFormulario(){
    this.formRegistro = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
       /* se valida que sea un correo atraves de la expresion regular */
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/)]], 
      /* se valida que la contrase;a tenga minimo 8 caracteres entre ellos 1 mayuscula, 1 minuscula, 1 numero y 1 caracter especial */
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)]], 
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], /* se valida que el telefono tenga 10 digitos */
      rol: ['',[Validators.required]],
      terminos: [false, Validators.requiredTrue] /* se valida que los terminos y condiciones esten aceptados */
    })
    console.log(this.formRegistro.value);
  }

  guardar(){
    if(this.formRegistro.invalid){
      return Object.values(this.formRegistro.controls).forEach((control: any) => {
        control.markAsTouched(); /* marca todos los campos como tocados para que se muestren los mensajes de error */
      }); 
    }
    // Realizar el envío del formulario o cualquier otra acción necesaria
    console.log('Formulario válido y listo para enviar:', this.formRegistro.value);
  }

  verPassword(){
    this.verTexto = !this.verTexto;
  }
}
