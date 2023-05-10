import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CompraComponent } from './compra/compra.component';
import { DomseguroPipe } from './domseguro.pipe';
import { ContenidoComponent } from './contenido/contenido.component';
import { InicioComponent } from './inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservaComponent } from './reserva/reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CatalogoComponent,
    CompraComponent,
    DomseguroPipe,
    ContenidoComponent,
    InicioComponent,
    ReservaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
