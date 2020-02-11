import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore'

import { AngularFireAuthModule } from '@angular/fire/auth';
import { Facebook,FacebookLoginResponse} from '@ionic-native/facebook/ngx';
import { AngularFireStorage} from '@angular/fire/storage';
import { from } from 'rxjs';
import { firebaseConfig } from 'src/environments/environment';
import { ModalPagePage } from './modal-page/modal-page.page';

import { FormsModule } from '@angular/forms';
import { EditModalPage } from './edit-modal/edit-modal.page';
import { ImagePicker } from '@ionic-native/image-picker/ngx';




@NgModule({
  declarations: [AppComponent,
  
    ModalPagePage,
    EditModalPage,
  
  ],
  entryComponents: [

    ModalPagePage,
    EditModalPage,

  ],
  imports: [
  BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    Camera,
    ImagePicker,
    AngularFireStorage,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 