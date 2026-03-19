import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interface';
import { IUsuario } from '../interfaces/iusuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private httpClient = inject(HttpClient)
  private endPoint: string = "https://peticiones.online/api/users";

  getAll(page: number = 0): Promise<IResponse> {
    let url = (page === 0) ? this.endPoint : this.endPoint + `?page=${page}`;
    return lastValueFrom(this.httpClient.get<IResponse>(url));
  }

  getById(id: string): Promise<IUsuario> {
    return  lastValueFrom(this.httpClient.get<IUsuario>(`${this.endPoint}/${id}`));
  }

  delete(id: string): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.delete<IUsuario>(`${this.endPoint}/${id}`));
  }

  update(user: IUsuario): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.put<IUsuario>(`${this.endPoint}/${user._id}`, user))
  }

  insert(user: IUsuario): Promise<IUsuario> {
    return lastValueFrom(this.httpClient.post<IUsuario>(this.endPoint, user))
  }
}
