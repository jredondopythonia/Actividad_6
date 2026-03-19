import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './usuarios-form.component.html',
  styleUrl: './usuarios-form.component.css'
})
export class UsuariosFormComponent {
  @Input() idUsuario: string = ""
  userForm: FormGroup = new FormGroup({
    _id: new FormControl(null),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    image: new FormControl('')
  });
  
  selectedUser!: IUsuario;
  usuariosService = inject(UsuariosService);
  title: string = 'Registrar';
  router = inject(Router);

  async ngOnInit(){

    if (this.idUsuario) {
      try {
        this.selectedUser = await this.usuariosService.getById(this.idUsuario);
        this.title = 'Actualizar'
      } catch (msg: any) {
        toast.error(msg.error.error)
      }
    }

    this.userForm = new FormGroup({
      _id: new FormControl(this.idUsuario || null, []),
      first_name: new FormControl(this.selectedUser?.first_name || "", []),
      last_name: new FormControl(this.selectedUser?.last_name || "", []),
      username: new FormControl(this.selectedUser?.username || "", []),
      email: new FormControl(this.selectedUser?.email || "", []),
      password: new FormControl(this.selectedUser?.password || "", []),
      image: new FormControl(this.selectedUser?.image || "", [])
    }, [])
  }

  async getDataForm(){
    let response: IUsuario | any

    try{
      if(this.userForm.value._id){
        response = await this.usuariosService.update(this.userForm.value);
      }else{
        response = await this.usuariosService.insert(this.userForm.value);
      }

      if (response.id) {
        toast.success(`Usuario  ${this.title=='Registrar'?'registrado':'actualizado'} correctamente`)
        this.router.navigate(['/home'])
      }else{
        toast.error(response.error)
      }
    } catch (msg: any) {
      toast.error(msg.error)
    }
  
  
  }
}