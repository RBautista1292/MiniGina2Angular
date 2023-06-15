import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoComponent } from './contenido/contenido.component';
import { InicioComponent } from './inicio/inicio.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { CitasRegistradasComponent } from './citas-registradas/citas-registradas.component';
import { APIComponent } from './api/api.component';
import { ContactoComponent } from './contacto/contacto.component';
import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';
import { LoginComponent } from './login/login.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { VerificarComponent } from './verificar/verificar.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'contenido', component: ContenidoComponent },
  { path: 'nosotros', component: SobreNosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'proximamente', component: APIComponent },
  { path: 'reservaciones', component: CitasRegistradasComponent },
  { path: 'contenido/:movie', component: ContenidoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'verificacion', component: VerificarComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Cuando es la raíz
  { path: '**', redirectTo: '/inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
