import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoComponent } from './contenido/contenido.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CompraComponent } from './compra/compra.component';

const routes: Routes = [
  { path: "contenido", 
    component: ContenidoComponent, 
    children: [
      { path: "catalogo", component: CatalogoComponent },
      { path: "compra", component: CompraComponent },
      { path: "", redirectTo: "contenido", pathMatch: "full" },// Cuando es la raíz
      { path: "**", redirectTo: "contenido" }
    ],
  },
  { path: "", redirectTo: "/contenido", pathMatch: "full" },// Cuando es la raíz
  { path: "**", redirectTo: "/contenido" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
