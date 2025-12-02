import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { CredencialesService } from './credenciales.service';
import Swal from 'sweetalert2';

const base_URL =  environment._url;

const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  usuarios: any;
  perfiles: any;
  tiposDocumento: any;
  listaUsuarios: any;
  // Observable público para que los componentes esperen hasta que la lista esté lista
  listaUsuarios$ = new BehaviorSubject<any[] | null>(null);

  constructor(
    private http: HttpClient,
    private credencialesService: CredencialesService,
    
  ) { 
  // no iniciar cargas automáticas aquí; llamar a initListaUsuarios() desde componentes cuando se necesite
  }

  setToken(token: string) {
    const today = new Date();
    const expiration = new Date(today);
    expiration.setHours(today.getHours() + 8); // El token expira en 8 hora
    localStorage.setItem('token', token);
    localStorage.setItem('token_expiration', expiration.getTime().toString());
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('token_expiration');
    if (token && expiration) {
      const now = new Date().getTime();
      return now < parseInt(expiration, 10);
    }
    return false;
  }

  getConexion(){
    return this.http.get(`${base_URL}/`);
  }

  /**
   * Inicializa la carga de perfiles, tipos y usuarios, normaliza los arrays y emite
   * el resultado en `listaUsuarios$`. Los componentes pueden suscribirse a ese
   * observable y esperar hasta que no sea `null`.
   */
  initListaUsuarios(): void {
    forkJoin({
      perfiles: this.credencialesService.getAllPerfiles().pipe(catchError(() => of(null))),
      tipos: this.credencialesService.getAllTiposDocumento().pipe(catchError(() => of(null))),
      usuarios: this.credencialesService.getAllUsers().pipe(catchError(() => of(null)))
    }).subscribe(result => {
      this.perfiles = result.perfiles;
      this.tiposDocumento = result.tipos;
      this.usuarios = result.usuarios;  
      // normalizar formas de respuesta y asegurar arrays
      const usuariosArr: any[] = Array.isArray(this.usuarios) ? this.usuarios
        : (this.usuarios && (this.usuarios.usuarios || this.usuarios.data || this.usuarios.results)) || [];
      const perfilesArr: any[] = Array.isArray(this.perfiles) ? this.perfiles
        : (this.perfiles && (this.perfiles.perfil || this.perfiles.data)) || [];
      const tiposArr: any[] = Array.isArray(this.tiposDocumento) ? this.tiposDocumento
        : (this.tiposDocumento && (this.tiposDocumento.Tipodocumento || this.tiposDocumento.data)) || [];

      this.listaUsuarios = usuariosArr.map((usuario: any) => {
        const perfil = perfilesArr.find((p: any) => p.id === (usuario.id_perfil ?? usuario.perfilId ?? usuario.perfil_id));
        const tipoDocumento = tiposArr.find((t: any) => t.id_tipo_documento === (usuario.tipo_documento_id ?? usuario.tipoDocumentoId ?? usuario.tipo_documento));
        return {
          ...usuario,
          perfilNombre: perfil ? perfil.nombre : 'N/A',
          tipoDocumentoNombre: tipoDocumento ? tipoDocumento.nombre : 'N/A'
        };
      });  
      this.listaUsuarios$.next(this.listaUsuarios);  
    }, error => {
      console.error('Error al inicializar listaUsuarios', error);
      this.listaUsuarios$.next([]);
    });  
  }

  showAlert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info') {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK'
    });
  }

  showConfirm(title: string, text: string) {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });
  }
}

