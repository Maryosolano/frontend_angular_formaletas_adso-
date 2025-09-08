import { Component } from '@angular/core';
import { HeaderComponent } from '../../global/header/header.component';
import { NavbarComponent } from '../../global/navbar/navbar.component';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../global/footer/footer.component';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, NavbarComponent, FooterComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

 formRegistro: any = FormGroup;
  verTexto: boolean = false;
  
  get nombreNoValido() {
    return this.formRegistro.get('nombre').invalid && this.formRegistro.get('nombre').touched;
  }
  /* get emailNoValido() {
    return this.formRegistro.get('email').invalid && this.formRegistro.get('email').touched;
  } */
  get passwordNoValido() {
    return this.formRegistro.get('password').invalid && this.formRegistro.get('password').touched;
  }

  public errorMessage = {
    nombre: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minlength', message: 'El nombre debe tener al menos 5 caracteres' }
    ],
   /*  email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'pattern', message: 'El correo no es valido' }
    ], */
    password: [
      { type: 'required', message: 'La contrase;a es obligatoria' }
    ],
  }

  constructor(
    private fb: FormBuilder, /* creacion de fomulario reactivo */
    private generalService: GeneralService /*inyeccion del servicio*/
  ) { 
    this.crearFormulario(); /*llamado inicial a la funcion para inicializar el formulario*/
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.formRegistro = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      //email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/)]], /* se valida que sea un correo atraves de la expresion regular */
      password: ['', [Validators.required, Validators.minLength(8)]], /* se valida que tenga minimo 8 caracteres */
    })
    console.log(this.formRegistro.value);
  }

  guardar(){
    if(this.formRegistro.invalid){
      console.log('Formulario no valido', this.formRegistro.value);
      
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

