import { Component } from '@angular/core';
import { FooterComponent } from '../../global/footer/footer.component';
import { NavbarComponent } from '../../global/navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  imports: [ FooterComponent, NavbarComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.scss'
})
export class ContactoComponent {

  formularioContacto: any = FormGroup;

  get nombreNoValido() {
    return this.formularioContacto.get('nombre').invalid && this.formularioContacto.get('nombre').touched;
  }
  get emailNoValido() {
    return this.formularioContacto.get('email').invalid && this.formularioContacto.get('email').touched;
  }
  get telefonoNoValido() {
    return this.formularioContacto.get('telefono').invalid && this.formularioContacto.get('telefono').touched;
  }
  get rolNoValido() {
    return this.formularioContacto.get('mensaje').invalid && this.formularioContacto.get('mensaje').touched;
  }
  get terminosNoValido() {
    return this.formularioContacto.get('terminos').invalid && this.formularioContacto.get('terminos').touched;
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
    telefono: [
      { type: 'required', message: 'El telefono es obligatorio' },
      { type: 'pattern', message: 'El telefono debe tener 10 digitos' }
    ],
    mensaje: [
      { type: 'required', message: 'El mensaje es obligatorio' },
      { type: 'maxlength', message: 'El mensaje no debe exceder los 200 caracteres' }  
    ],
    terminos: [
      { type: 'required', message: 'Debe aceptar los terminos y condiciones' }
    ]
  }

  constructor(
    private fb: FormBuilder,
  ) {
    this.crearFormulario();
   }
   ngOnInit(): void {
    
    //console.log(this.formularioContacto);
  }

  crearFormulario() {
    this.formularioContacto = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      mensaje: ['', [Validators.required, Validators.maxLength(200)]],
      terminos: [false, Validators.requiredTrue]
    });
  }

  enviarFormulario() {
     if(this.formularioContacto.invalid){
      return Object.values(this.formularioContacto.controls).forEach((control: any) => {
        control.markAsTouched(); /* marca todos los campos como tocados para que se muestren los mensajes de error */
      }); 
    }
    console.log(this.formularioContacto);
    // Aquí puedes agregar la lógica para enviar el formulario, como una llamada a un servicio HTTP.
  }

}
