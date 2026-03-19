import { Component, inject, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { Router, RouterLink } from '@angular/router';
import { toast } from 'ngx-sonner';
import { IError } from '../../interfaces/ierror.interface';

@Component({
  selector: 'app-buttons',
  imports: [RouterLink],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() selectedUser!: IUsuario | any;
  usuariosService = inject(UsuariosService);
  router = inject(Router);
  @Input() volver: Boolean = false

  deleteUser(id: string) {
    console.log('selectedUser', this.selectedUser)
    console.log('id', id)
    toast(`Vas a borrar el usuario ${this.selectedUser.first_name} ${this.selectedUser.last_name}`, {
      action: {
        label: 'Aceptar',
        onClick: async () => {
          try{
            await this.usuariosService.delete(id);
            toast.success(`Usuario ${this.selectedUser?.first_name} ${this.selectedUser?.last_name} eliminado correctamente`);
            this.router.navigate(['/home']);
          }catch (error){
            toast.error(`No se ha podido borrar el usuario: ${error}`);
          }
        }
      }
    }
    )
  }
}
