import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Restaurants } from './../model/restaurant.interface';
import { Users } from '../model/user.interface';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ConexionesService {

  constructor(private alertController:AlertController,private aut: AngularFireAuth,private ruta:Router,private fb: Facebook,private db:AngularFirestore) { }



   addRestaurant:Restaurants={
    id: "",
    name: "",
    type: "",
    district:"",
    comments: "",
    visited:false,
    opinion:"",
    rating: 0,
  }

 async Add(data){

    this.addRestaurant.id=this.db.createId();
    this.addRestaurant.name=data.name;
    this.addRestaurant.type=data.type;
    this.addRestaurant.district=data.district;
    this.addRestaurant.comments=data.comments;
    this.addRestaurant.visited=data.visited;
    this.addRestaurant.opinion=data.opinion;
    this.addRestaurant.rating=data.rating;




 
    this.db.doc("/users/"+ localStorage.getItem("user_id") +"/Restaurant/"+ this.addRestaurant.id).set(this.addRestaurant);

    console.log(this.addRestaurant);

  }


  ////////////////////////////////////////////////////////////////////////////////

  async getRestaurantsList(){
    let userData:AngularFirestoreCollection=this.db.collection<Restaurants>("/users/"+ localStorage.getItem("user_id") +"/Restaurant/");

          return userData;

        }


        markVisited(restaurant){
        
          this.addRestaurant.id=restaurant.id;
          this.addRestaurant.name=restaurant.name;
          this.addRestaurant.type=restaurant.type;
          this.addRestaurant.district=restaurant.district;
          this.addRestaurant.comments=restaurant.comments;
          this.addRestaurant.visited=true;
          this.addRestaurant.opinion=restaurant.opinion;
          this.addRestaurant.rating=restaurant.rating;

        this.db.doc("/users/"+ localStorage.getItem("user_id") +"/Restaurant/"+ restaurant.id).update(this.addRestaurant);

        }

        markNotVisited(restaurant){
        
          this.addRestaurant.id=restaurant.id;
          this.addRestaurant.name=restaurant.name;
          this.addRestaurant.type=restaurant.type;
          this.addRestaurant.district=restaurant.district;
          this.addRestaurant.comments=restaurant.comments;
          this.addRestaurant.visited=false;
          this.addRestaurant.opinion=restaurant.opinion;
          this.addRestaurant.rating=restaurant.rating;

        this.db.doc("/users/"+ localStorage.getItem("user_id") +"/Restaurant/"+ restaurant.id).update(this.addRestaurant);

        }


      async  delete(id){
        
            const alert =  await this.alertController.create({
              header: 'Confirm!',
              message: 'Message <strong>text</strong>!!!',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                    console.log('Confirm Cancel: blah');
                  }
                }, {
                  text: 'Okay',
                  handler: () => {
                    this.db.doc("/users/"+ localStorage.getItem("user_id") +"/Restaurant/"+ id).delete();
                    console.log('Confirm Okay');
                  }
                }
              ]
            });
        
             alert.present();
          
       
        }


}
