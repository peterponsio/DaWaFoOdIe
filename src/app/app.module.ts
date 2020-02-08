import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore'

import { AngularFireAuthModule } from '@angular/fire/auth';
import { Facebook,FacebookLoginResponse} from '@ionic-native/facebook/ngx';

import { from } from 'rxjs';
import { firebaseConfig } from 'src/environments/environment';
import { ModalPagePage } from './modal-page/modal-page.page';




@NgModule({
  declarations: [AppComponent,
  
    ModalPagePage,
  
  ],
  entryComponents: [

    ModalPagePage,

  ],
  imports: [
  BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    
    AngularFireAuthModule,
    AngularFirestoreModule,
   

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 