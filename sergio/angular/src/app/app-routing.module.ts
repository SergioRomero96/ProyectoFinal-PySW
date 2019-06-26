import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {InicioComponent} from './components/inicio/inicio.component';
import {EscribaniasComponent} from './components/escribanias/escribanias.component';
import {ContactenosComponent} from './components/contactenos/contactenos.component';
import {NosotrosComponent} from './components/nosotros/nosotros.component';
import {NovedadesComponent} from './components/novedades/novedades.component';
import {UsuarioComponent} from './components/usuario/usuario.component';
import {PagosComponent} from './components/pagos/pagos.component';
import {EscribanosComponent} from './components/escribanos/escribanos.component';
import {NovedadEscribanoComponent} from './components/novedad-escribano/novedad-escribano.component';
const routes: Routes = [
  { path: 'inicio', component: InicioComponent},
  { path: 'escribanias', component: EscribaniasComponent },
  { path: 'contactenos', component: ContactenosComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'novedades', component: NovedadesComponent },
  { path: 'login', component: LoginComponent },
  { path:'usuario', component: UsuarioComponent},
  { path:'pagos', component: PagosComponent},
  { path:'escribanos', component: EscribanosComponent},
  { path:'novedad-escribano', component: NovedadEscribanoComponent},
  { path: '**', pathMatch:'full',redirectTo:'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
