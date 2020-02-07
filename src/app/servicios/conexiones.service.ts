import { AngularFirestore } from '@angular/fire/firestore';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Restaurants } from './../model/restaurant.interface';


@Injectable({
  providedIn: 'root'
})
export class ConexionesService {

  constructor(private aut: AngularFireAuth,private ruta:Router,private fb: Facebook,private db:AngularFirestore) { }



   addRestaurant:Restaurants={
    id: "",
    name: "",
    type: "",
    description: "",
    rating: 0,
  }

 async Add(){

    this.addRestaurant.id=this.db.createId();
    this.addRestaurant.name=this.addRestaurant.name;
    this.addRestaurant.type=this.addRestaurant.type;
    this.addRestaurant.description=this.addRestaurant.description;
    this.addRestaurant.rating=3;

 
    this.db.doc("/users/"+ localStorage.getItem("user_id") +"/Restaurant/"+ this.addRestaurant.id).set(this.addRestaurant);

    console.log(this.addRestaurant);

  }


}
