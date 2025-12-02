import { Component } from '@angular/core';
import { NavbarComponent } from '../../global/navbar/navbar.component';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralService } from '../../../services/general.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../global/footer/footer.component';
import { CredencialesService } from '../../../services/credenciales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ NavbarComponent, FooterComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formLogin: any = FormGroup;
  verTexto: boolean = false;
  
  constructor(
    private fb: FormBuilder, /* creacion de fomulario reactivo */
    private generalService: GeneralService, /*inyeccion del servicio*/
    private credencialesService: CredencialesService,
    private router: Router
  ) { 
    this.crearFormulario(); /*llamado inicial a la funcion para inicializar el formulario*/
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.formLogin
     = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/)]],
       /* se valida que tenga minimo 5 caracteres */
      contrasena: ['', [Validators.required, Validators.minLength(5)]],
    })
    console.log(this.formLogin
      .value);
  }

  login(){
    if(this.formLogin
      .invalid){
      return Object.values(this.formLogin
        .controls).forEach((control: any) => {
        /* marca todos los campos como tocados para que se muestren los mensajes de error */
        control.markAsTouched(); 
      }); 
    }   
    this.credencialesService.userLogin(this.formLogin
      .value).subscribe( (resp: any) => {
      this.generalService.setToken(resp.access_token);
      this.router.navigate(['/admin']);      
    }, error => {
      console.log('error en el login', error);
      this.generalService.showAlert('Error', 'Credenciales incorrectas', 'error');
    });
  }

  verPassword(){
    this.verTexto = !this.verTexto;
  }
}

