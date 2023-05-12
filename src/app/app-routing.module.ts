import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoComponent } from './contenido/contenido.component';
import { InicioComponent } from './inicio/inicio.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { CitasRegistradasComponent } from './citas-registradas/citas-registradas.component';
import { APIComponent } from './api/api.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'contenido', component: ContenidoComponent },
  { path: 'nosotros', component: SobreNosotrosComponent },
  { path: 'proximamente', component: APIComponent },
  { path: 'reservaciones', component: CitasRegistradasComponent },
  { path: 'contenido/:movie', component: ContenidoComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Cuando es la raíz
  { path: '**', redirectTo: '/inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
