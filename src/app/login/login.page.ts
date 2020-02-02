import { AutenticacionesService } from './../servicios/autenticaciones.service';
import { Component, OnInit } from '@angular/core';
import { VisualesService } from './../servicios/visuales.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  gmail:string;
  gpass:string;
  gall: string;

  mail:string;
  password:string;

  

  constructor(private auSer: AutenticacionesService, private visuSer: VisualesService, private ruta: Router) { 

    this.mail="";
    this.password="";
    this.gall="";

    this.gmail="";
    this.gpass="";

  }

  ngOnInit() {
  }

  Log(){
    if (this.mail == "" && this.password == ""){
    
      this.gall="Fill the mail and password  correctly";
      this.gpass = "";
      this.gmail = "";
      
    }else if(this.password==""){
        
      this.gpass = "Fill the password correctly";
      this.gall = "";
      this.gmail = "";

      }else if(this.mail==""){
      
      this.gmail = "Fill the mail correctly";
      this.gall = "";
      this.password = "";
      
    }else{
          this.auSer.Log_in(this.mail,this.password)
            .then((datos) => {

              console.log(datos);

              this.ruta.navigateByUrl("/tabs");


            }).catch(error => {

              console.log(error);
              this.visuSer.presentToast("Failed to Log-in");

            });
      }
  }

  Forgot(){

    this.visuSer.Forgot_pass()
      .then((datos) => {

        
        this.visuSer.presentToast("Try to log in again");


      }).catch(error => {

        console.log(error);
        this.visuSer.presentToast("Failed to Reset your password try again");

      });

  }


}
