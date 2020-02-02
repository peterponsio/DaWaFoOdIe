import { Users } from './../model/user.interface';
import { AutenticacionesService } from './../servicios/autenticaciones.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { VisualesService } from './../servicios/visuales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  gname: string;
  gmail: string;
  gpass1: string;
  gpass2: string;
  gall: string;

  name: string;
  email: string;
  password1: string;
  password2: string;

  newUser:Users={
    id:"",
    name:"",
    mail:"",
    password:"",
    
  }


  constructor(private auSer: AutenticacionesService, private visuSer: VisualesService, private ruta: Router) { 

    this.name = "";
    this.email = "";
    this.password1 = "";
    this.password2 = "";
   
   
    this.gall = "";

    this.gmail = "";
    this.gpass1 = "";
    this.gpass2 = "";
    this.gname = "";

  }

  ngOnInit() {
  }

  Reg() {
    if (this.email == "" && this.password1 == "" && this.password2=="" && this.name=="") {

      this.gall = "Fill the fields correctly";
      this.gpass1 = "";
      this.gmail = "";
      this.gpass2 = "";
      this.gname = "";

    } else if (this.email == "") {


      this.gall = "";
      this.gpass1 = "";
      this.gmail = " Fill the mail correctly";
      this.gpass2 = "";
      this.gname = "";

     

    } else if (this.password1 == "") {

      this.gall = "";
      this.gpass1 = "Fill the password correctly";
      this.gmail = "";
      this.gpass2 = "";
      this.gname = "";
      

    } else if(this.password2==""){
     
      this.gall = "";
      this.gpass1 = "";
      this.gmail = "";
      this.gpass2 = "The password dont match please try again";
      this.gname = "";

    }else if(this.name==""){

      this.gall = "";
      this.gpass1 = "";
      this.gmail = "";
      this.gpass2 = "";
      this.gname = "Fill the user name please";

    }else if( this.password2==this.password2){
      this.newUser.id="";
      this.newUser.name=this.name;
      this.newUser.mail=this.email;
      this.newUser.password=this.password1;
      
      this.auSer.CreateUser(this.newUser)
        .then((datos) => {
         
          console.log(datos);
          
          this.ruta.navigateByUrl("/tabs");

        }).catch(error => {

          console.log(error);
          this.visuSer.presentToast("Failed to create");

        });


    }
  }

}
