import { Component, Input } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario.interface';
import { ButtonsComponent } from '../../shared/buttons/buttons.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuario-card',
  imports: [ButtonsComponent, RouterLink],
  templateUrl: './usuario-card.component.html',
  styleUrl: './usuario-card.component.css'
})
export class UsuarioCardComponent {
  @Input() selectedUser!: IUsuario;
}