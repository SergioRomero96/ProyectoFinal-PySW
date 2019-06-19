import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//MODULOS AGREGADOS
import { FormsModule } from '@angular/forms';
import {DataTableModule} from 'angular-6-datatable';
import {HttpClientModule} from '@angular/common/http';
//MODULOS AGREGADOS

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTableModule,  //agregado
    HttpClientModule  //agregado
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
