import { Users } from './../model/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionesService {

  constructor(private aut: AngularFireAuth) { }

////////////////////////////// Login ///////////////////////////////////////////////////////////////

 async Log_in(mail: string, password: string){

    return this.aut.auth.signInWithEmailAndPassword(mail, password)

      .then((credential: firebase.auth.UserCredential) => {
        console.log(credential.user);
      }).catch(error => {
        console.log(error);
        //throw new Error(error);
      });

  }

/////////////////////////////Create User///////////////////////////////////////////////////////////////


  CreateUser(newUser:Users){

    return this.aut.auth.createUserWithEmailAndPassword(newUser.mail, newUser.password)
      .then((credential: firebase.auth.UserCredential) => {

        console.log(credential.user);
      
      }).catch(error => {

        console.log(error);

      });

  }

  //////////////////////////////////Login with facebook///////////////////////////////////////////////////////////

  F_log(){

  }

  G_log(){

  }




}
