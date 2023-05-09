import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoComponent } from './contenido/contenido.component';
import { InicioComponent } from './inicio/inicio.component';

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
  { path: "", redirectTo: "/inicio", pathMatch: "full" },// Cuando es la raíz
  { path: "**", redirectTo: "/inicio" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
