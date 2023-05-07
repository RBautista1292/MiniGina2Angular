import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CompraComponent } from './compra/compra.component';
import { DomseguroPipe } from './domseguro.pipe';
import { ContenidoComponent } from './contenido/contenido.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CatalogoComponent,
    CompraComponent,
    DomseguroPipe,
    ContenidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
