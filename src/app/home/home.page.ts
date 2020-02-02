import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Router } from '@angular/router';
import { AutenticacionesService } from './../servicios/autenticaciones.service';
import { VisualesService } from './../servicios/visuales.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
 

  constructor(private ruta: Router, private aut: AutenticacionesService, private visuSer:VisualesService) { }

  ngOnInit() {
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
        this.ruta.navigateByUrl("/tabs");

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
