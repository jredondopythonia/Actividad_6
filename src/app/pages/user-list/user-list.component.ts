import { Component, inject } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { toast } from 'ngx-sonner';
import { UsuarioCardComponent } from '../../components/usuario-card/usuario-card.component';

@Component({
  selector: 'app-user-list',
  imports: [UsuarioCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  arrUsuarios: IUsuario[] = [];
  usuariosServices = inject(UsuariosService);
  page: number = 0;
  nextPage: number = 0;
  prevPage: number = 0;
  total_pages: number = 0;

  enablePrevBtn: boolean = false;
  enableNextBtn: boolean = false;

  isLoading: boolean = false;

  async ngOnInit() {
    this.cargarPersonajes();
  }

  async gotoNext() {
    this.cargarPersonajes(this.nextPage)
  }

  gotoPrev() {
    this.cargarPersonajes(this.prevPage)
  }

  async cargarPersonajes(page: number = 0) {
    this.isLoading = true;
    try {
      let response: IResponse = await this.usuariosServices.getAll(page);
      this.page = response.page;
      this.nextPage = response.page == response.total_pages ? 0 : response.page + 1;
      this.prevPage = response.page == 1 ? 0 : response.page - 1;
      this.total_pages = response.total_pages;
      this.arrUsuarios = response.results;

      this.enablePrevBtn = this.prevPage > 0;
      this.enableNextBtn = this.nextPage > 0;
    } catch (error) {
      console.log(error);
    }
    finally{
      this.isLoading = false;
    }
  }
}