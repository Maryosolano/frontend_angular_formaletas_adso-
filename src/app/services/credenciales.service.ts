import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

const base_URL =  environment._url;

@Injectable({
  providedIn: 'root'
})
export class CredencialesService {

  constructor(
    private http: HttpClient
  ) { }

  userLogin(data: any){
    console.log('data servicio login', data);
    return this.http.post(`${base_URL}/usuario/login/`, data);
  }

  getAllUsers(){
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders(token ? { 'Authorization': `Bearer ${token}` } : {});
  return this.http.get(`${base_URL}/usuario/`, { headers });
  }

  getAllPerfiles(){
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders(token ? { 'Authorization': `Bearer ${token}` } : {});
  return this.http.get(`${base_URL}/perfil/`, { headers });
  }

  getAllTiposDocumento(){
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders(token ? { 'Authorization': `Bearer ${token}` } : {});
  return this.http.get(`${base_URL}/tipo_documento/`, { headers });
  }

  createUser(data: any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(token ? { 'Authorization': `Bearer ${token}` } : {});
    return this.http.post(`${base_URL}/usuario/`, data, { headers });
  }

  updateUser(id: number, data: any){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(token ? { 'Authorization': `Bearer ${token}` } : {});
    return this.http.put(`${base_URL}/usuario/${id}/`, data, { headers });
  }

  deleteUser(id: number){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(token ? { 'Authorization': `Bearer ${token}` } : {});
    return this.http.delete(`${base_URL}/usuario/${id}/`, { headers });
  }
}
