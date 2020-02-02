import { AutenticacionesService } from './../servicios/autenticaciones.service';
import { Component, OnInit } from '@angular/core';

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

  

  constructor(private auSer: AutenticacionesService) { 

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
          this.auSer.Log_in(this.mail,this.password);
      }
  }


}
