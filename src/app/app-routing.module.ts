import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoComponent } from './contenido/contenido.component';
import { InicioComponent } from './inicio/inicio.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { CitasRegistradasComponent } from './citas-registradas/citas-registradas.component';

const routes: Routes = [
  { path: "inicio", component: InicioComponent },
  { path: "contenido", 
    component: ContenidoComponent, 
    /* children: [
      { path: "catalogo", component: CatalogoComponent },
      { path: "compra", component: CompraComponent },
      { path: "", redirectTo: "/contenido", pathMatch: "full" },// Cuando es la raíz
      { path: "**", redirectTo: "/contenido" }
    ], */
  },
  { path: "nosotros", component: SobreNosotrosComponent },
  {path: "reservaciones", component: CitasRegistradasComponent },
  { path: "contenido/:movie", component: ContenidoComponent },
  { path: "", redirectTo: "/inicio", pathMatch: "full" },// Cuando es la raíz
  { path: "**", redirectTo: "/inicio" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
