import { Users } from './../model/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook'
import * as firebase from 'firebase';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AutenticacionesService {


  constructor(private aut: AngularFireAuth,private ruta:Router) { }

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

  F_log(){

   
    var provider = new firebase.auth.FacebookAuthProvider();

   return firebase.auth().signInWithRedirect(provider)
    .then(function (result) {

      console.log(result);
      

    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    

  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  G_log(){

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