import { Users } from './../model/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';



@Injectable({
  providedIn: 'root'
})
export class AutenticacionesService {


  constructor(private aut: AngularFireAuth,private ruta:Router,private fb: Facebook) { }

////////////////////////////// Login ///////////////////////////////////////////////////////////////

 async Log_in(mail: string, password: string){

    return this.aut.auth.signInWithEmailAndPassword(mail, password)

      .then((credential: firebase.auth.UserCredential) => {
        
      }).catch(error => {
        console.log(error);
        throw new Error(error);
      });

  }

/////////////////////////////Create User///////////////////////////////////////////////////////////////


  CreateUser(newUser:Users){

    return this.aut.auth.createUserWithEmailAndPassword(newUser.mail, newUser.password)
      .then((credential: firebase.auth.UserCredential) => {

       
      
      }).catch(error => {

        console.log(error);
        throw new Error(error);
      });

  }

  //////////////////////////////////Login with facebook///////////////////////////////////////////////////////////

   async F_log(){

   
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    .catch(e => console.log('Error logging into Facebook', e));
  
  
    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

    localStorage.setItem("log","done");
   
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async G_log(){

    var provider = new firebase.auth.GoogleAuthProvider();


    return firebase.auth().signInWithRedirect(provider)
      .then((data) => {
        console.log(data);
        
      }).catch(error => {

        console.log(error);
        throw new Error(error);
      });

  }

  //////////////////////////////////////////Fortgot password////////////////////////////////////////////////////////////


  fortgot(mail:string){

    return this.aut.auth.sendPasswordResetEmail(mail)
      .then((data) => {

      }).catch(error => {

        console.log(error);
        throw new Error(error);
      });

  }


}