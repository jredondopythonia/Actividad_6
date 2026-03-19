import { Component, inject, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { toast } from 'ngx-sonner';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-usuario',
  imports: [ButtonsComponent],
  templateUrl: './vista-usuario.component.html',
  styleUrl: './vista-usuario.component.css'
})
export class VistaUsuarioComponent {
  @Input() idUsuario: string = "";
  usuario! : IUsuario | any;
  usuariosService = inject(UsuariosService);
  router = inject (Router);
  
  isLoading: boolean = false;

  async ngOnInit() {
    let id = this.idUsuario;
    this.isLoading = true;
    try{
      this.usuario = await this.usuariosService.getById(id);      
      if (this.usuario.error){
        toast.error('Se ha producido un error al cargar el usuario');
        this.router.navigate(['/usuarios']);
      }
    }catch (msg: any){
      toast.error('Se ha producido un error');
    }finally{
      this.isLoading = false;
    }
  }
}