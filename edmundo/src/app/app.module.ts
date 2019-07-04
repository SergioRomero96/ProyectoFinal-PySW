import { MapaComponent } from './components/mapa/mapa.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//AGREGADOS
import { FormsModule } from '@angular/forms';
import {DataTableModule} from 'angular-6-datatable';
import {HttpClientModule} from '@angular/common/http';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
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

//paginacion
import {NgxPaginationModule} from 'ngx-pagination';

import { LoginService } from './services/login.service';
import {Constantes} from './models/constantes/constantes';
import { EscribanosComponent } from './components/escribanos/escribanos.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { NovedadEscribanoComponent } from './components/novedad-escribano/novedad-escribano.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AsideComponent } from './components/layout/aside/aside.component';
import { AgmCoreModule } from '@agm/core';
import { FilterPagoPipe } from './pipes/filter-pago.pipe';
import { FilterFechaPipe } from './pipes/filter-fecha.pipe';
import { FilterMesPipe } from './pipes/filter-mes.pipe';
import { PushNotificationModule } from 'ng-push-notification';
import { Pag1Component } from './components/publico/pag1/pag1.component';
import { Pag2Component } from './components/publico/pag2/pag2.component';
import { Pag3Component } from './components/publico/pag3/pag3.component';
import { HistoriaComponent } from './components/publico/historia/historia.component';
import { Acad1Component } from './components/publico/acad1/acad1.component';
import { Acad2Component } from './components/publico/acad2/acad2.component';

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
    EscribanosComponent,
    NovedadEscribanoComponent,
    FilterPipe,
    AsideComponent,
    MapaComponent,
    FilterPagoPipe,
    FilterFechaPipe,
    FilterMesPipe,
    Pag1Component,
    Pag2Component,
    Pag3Component,
    HistoriaComponent,
    Acad1Component,
    Acad2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTableModule,  //agregado
    HttpClientModule,  //agregado
    AngularFontAwesomeModule,
    NgxPaginationModule,
    AlifeFileToBase64Module,

    PushNotificationModule.forRoot(/* Default settings here, interface PushNotificationSettings */),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),// ToastrModule added
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAz6wxbUFHLDcHNPCVIUj8ysXhAA1j-dQ4'
    }),
  ],
  providers: [LoginService, Constantes],
  bootstrap: [AppComponent]
})
export class AppModule { }
