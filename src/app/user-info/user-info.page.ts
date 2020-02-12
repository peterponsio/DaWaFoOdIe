import { VisualesService } from './../servicios/visuales.service';
import { ConexionesService } from './../servicios/conexiones.service';
import { Component, OnInit } from '@angular/core';
import { Users } from './../model/user.interface';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  email:string;

  uid:string;
 
  fecha:string;
 

  constructor(private conexion:ConexionesService,private visual:VisualesService) { }

  ngOnInit() {
    
    this.email=localStorage.getItem("correo");
    this.uid=localStorage.getItem("user");
    this.fecha=localStorage.getItem("fecha");

    this.conexion.getUser().then((data)=>{

        var datos=data;

        localStorage.setItem("correo",datos.email);
        localStorage.setItem("user",datos.uid);
        localStorage.setItem("fecha",datos.metadata.creationTime);

        console.log(datos);

    }).catch();


    this.email=localStorage.getItem("correo");
    this.uid=localStorage.getItem("user");
    this.fecha=localStorage.getItem("fecha");
    
  }



}
