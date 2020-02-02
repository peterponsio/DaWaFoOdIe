import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Router } from '@angular/router';
import { AutenticacionesService } from './../servicios/autenticaciones.service';
import { VisualesService } from './../servicios/visuales.service';
import { stringify } from 'querystring';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
 

  constructor(private ruta: Router, private aut: AutenticacionesService, private visuSer:VisualesService) { }

  

  ngOnInit() {
   
    firebase.auth().getRedirectResult().
    then(function (result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        console.log("dasdasd");
        localStorage.setItem("Inicio","ok");
      }
      
      // The signed-in user info.
      var user = result.user;
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
      
    if(localStorage.getItem("Inicio")){
       localStorage.removeItem("Inicio");
        this.ruta.navigateByUrl("/tabs");
      
    }
   
  }

  Login(){
      this.ruta.navigateByUrl("login")
  }

  Create_Account(){
    this.ruta.navigateByUrl("register")

  }

  Login_facebook(){
    
    this.aut.F_log()
      .then((datos) => {

        console.log(datos);
        this.visuSer.presentToast("Log with facebook done");
      

      }).catch(error => {

        console.log(error);
        this.visuSer.presentToast("Failed to log in whit facebook try again");

      });
 
  }

/////////////////////////////Google Login/////////////////////////////////////////////
  Login_google(){

    this.aut.G_log()
         .then((datos) => {

           console.log(datos);
           this.visuSer.presentToast("Log with Google done");
          
          this.ruta.navigateByUrl("/tabs");

          

         }).catch(error => {

           console.log(error);
           this.visuSer.presentToast("Failed to log in whit Google try again");

         });




  }



}
