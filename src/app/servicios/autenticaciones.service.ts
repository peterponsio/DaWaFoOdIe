import { AngularFirestore } from '@angular/fire/firestore';
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


  constructor(private aut: AngularFireAuth,private ruta:Router,private fb: Facebook,private db:AngularFirestore) { }

////////////////////////////// Login ///////////////////////////////////////////////////////////////

 async Log_in(newUser:Users){

    return this.aut.auth.signInWithEmailAndPassword(newUser.mail, newUser.password)

      .then((credential: firebase.auth.UserCredential) => {

        localStorage.setItem("user_id",credential.user.uid);

        console.log(credential.user.uid);

        
      }).catch(error => {
        console.log(error);
        throw new Error(error);
      });

  }

/////////////////////////////Create User///////////////////////////////////////////////////////////////


newUser:Users={

  id:"",
  name:"",
  mail:"",
  password:"",
  restaurants:"",

 }
 newUserF:Users={

  id:"",
  name:"",
  mail:"",
  password:"",
  restaurants:"",

 }

  CreateUser(newUserData){

    console.log(newUserData);

    return this.aut.auth.createUserWithEmailAndPassword(newUserData.mail, newUserData.password)
      .then((credential: firebase.auth.UserCredential) => {

        this.newUser.id=this.db.createId();
        this.newUser.name=newUserData.name;
        this.newUser.mail=newUserData.mail;
        this.newUser.restaurants=newUserData.restaurants;
        

        this.db.doc("/users/"+this.newUser.id ).set(this.newUser);

        localStorage.setItem("user_id",this.newUser.id);
      
      }).catch(error => {

        console.log(error);
        throw new Error(error);
      });

  }

  //////////////////////////////////Login with facebook///////////////////////////////////////////////////////////

   async F_log(){

   
    this.fb.login(['email'])
    .then((response: FacebookLoginResponse) => {
      this.onLoginSuccess(response);
      console.log(response.authResponse.accessToken);
    }).catch((error) => {
      console.log(error)
      
    });
   
  }
  
  onLoginSuccess(res: FacebookLoginResponse) {
    // const { token, secret } = res;
    const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    this.aut.auth.signInWithCredential(credential)
      .then((response) => {
        console.log(response.user);

        this.newUserF.id=response.user.uid;
        
        this.newUserF.mail=response.user.email;

        this.db.doc("/users/"+this.newUserF.id ).set(this.newUserF);
     
        localStorage.setItem("user_id",this.newUserF.id);

        this.ruta.navigate(["tabs"]);
      })
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