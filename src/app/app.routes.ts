import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { VistaUsuarioComponent } from './pages/vista-usuario/vista-usuario.component';
import { Error404Component } from './pages/error404/error404.component';
import { UsuariosFormComponent } from './pages/usuarios-form/usuarios-form.component';

export const routes: Routes = [
    { path: "", pathMatch: 'full', redirectTo: 'home' },
    { path: "home", component: UserListComponent },
    { path: 'newuser', component: UsuariosFormComponent },
    { path: "user/:idUsuario", component: VistaUsuarioComponent },
    { path: "updateuser/:idUsuario", component: UsuariosFormComponent },
    { path: '**', component: Error404Component }
];