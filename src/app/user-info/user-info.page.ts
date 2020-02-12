import { ConexionesService } from './../servicios/conexiones.service';
import { Component, OnInit } from '@angular/core';
import { Users } from './../model/user.interface';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {

  currentUsers: any;
 

  constructor(private conexion:ConexionesService) { }

  ngOnInit() {

    this.conexion.getUserData().then((data)=>{

      data.valueChanges().subscribe(
    
        res=>{

       
          
          this.currentUsers=res;
          
          console.log(this.currentUsers);
        })

    }).catch();


   
    
  }

}
