import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login/login.component';
import { RegistrarComponent } from './components/login/registrar/registrar.component';
import { RecuperarComponent } from './components/login/recuperar/recuperar.component';
import { HomeComponent } from './components/login/home/home.component';
import { ElegirComponent } from './components/main/elegir/elegir.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    RecuperarComponent,
    HomeComponent,
    ElegirComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
