import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//AGREGADOS
import { FormsModule } from '@angular/forms';
import {DataTableModule} from 'angular-6-datatable';
import {HttpClientModule} from '@angular/common/http';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
//AGREGADOS

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header.component';
import { FooterComponent } from './components/layout/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { EscribaniasComponent } from './components/escribanias/escribanias.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { PagosComponent } from './components/pagos/pagos.component';

import { LoginService } from './services/login.service';
import {Constantes} from './models/constantes/constantes';
import { EscribanosComponent } from './components/escribanos/escribanos.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    ContactenosComponent,
    NosotrosComponent,
    EscribaniasComponent,
    NovedadesComponent,
    LoginComponent,
    UsuarioComponent,
    PagosComponent,
    EscribanosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTableModule,  //agregado
    HttpClientModule,  //agregado
    AngularFontAwesomeModule

  ],
  providers: [LoginService, Constantes],
  bootstrap: [AppComponent]
})
export class AppModule { }
