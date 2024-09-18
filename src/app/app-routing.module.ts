import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component'
import { HomeComponent } from './components/login/home/home.component';
import { RecuperarComponent } from './components/login/recuperar/recuperar.component';
import { RegistrarComponent } from './components/login/registrar/registrar.component';
import { ElegirComponent } from './components/main/elegir/elegir.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'registrar', component:  RegistrarComponent},
  { path: 'elegir-perfil', component:  ElegirComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
