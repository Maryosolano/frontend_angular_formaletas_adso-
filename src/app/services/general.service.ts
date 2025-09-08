import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  listaRoles: string[] = ['Admin', 'Usuario', 'Invitado'];

  constructor() { }

  getData(){
    /* esta lista se espera traer del backend */
    return this.listaRoles;
  }
}

