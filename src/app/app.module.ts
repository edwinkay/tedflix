import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login/login.component';
import { RegistrarComponent } from './components/login/registrar/registrar.component';
import { RecuperarComponent } from './components/login/recuperar/recuperar.component';
import { HomeComponent } from './components/login/home/home.component';
import { ElegirComponent } from './components/main/elegir/elegir.component';
import { MainComponent } from './components/main/main/main.component';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    RecuperarComponent,
    HomeComponent,
    ElegirComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
