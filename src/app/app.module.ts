import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
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
import { MovieSynopsisComponent } from './components/main/movie-synopsis/movie-synopsis.component';
import { MobileMainComponent } from './components/main/mobile-main/mobile-main.component';
import { DesktopMainComponent } from './components/main/desktop-main/desktop-main.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    RecuperarComponent,
    HomeComponent,
    ElegirComponent,
    MainComponent,
    MovieSynopsisComponent,
    MobileMainComponent,
    DesktopMainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HammerModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
