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
    
    if(data.visited==undefined){
      this.addRestaurant.visited=false;
    }else{
      this.addRestaurant.visited=true;
    }
    if(data.comments == undefined || data.comments == ""){
      this.addRestaurant.comments="add comments";
    }else{
      this.addRestaurant.comments=data.comments;
    }
    if(data.opinion == "" || data.opinion == undefined){
      this.addRestaurant.opinion="add opinion";
    }else{
      this.addRestaurant.opinion=data.opinion;
    }
    
    
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

        Edit(restaurant:Restaurants,previous:Restaurants){

          console.log(previous);

          if(restaurant.name!="" && restaurant.type!=""  && restaurant.district!="" && restaurant.comments!="" && restaurant.visited!=undefined && restaurant.opinion!="" && restaurant.rating!=null){
            this.addRestaurant.id=restaurant.id;
            this.addRestaurant.name=restaurant.name;
            this.addRestaurant.type=restaurant.type;
            this.addRestaurant.district=restaurant.district;
            this.addRestaurant.comments=restaurant.comments;
            this.addRestaurant.visited=restaurant.visited;
            this.addRestaurant.opinion=restaurant.opinion;
            this.addRestaurant.rating=restaurant.rating;
          }
          
           if(restaurant.name==undefined){
            this.addRestaurant.name=previous.name;
            console.log("entro");
          } else{
            this.addRestaurant.name=restaurant.name;
          }
          if(restaurant.type==undefined){
            this.addRestaurant.type=previous.type;
          } else{
            this.addRestaurant.type=restaurant.type;

          }
          if(restaurant.district==undefined){
            this.addRestaurant.district=previous.district;
          } else{
            this.addRestaurant.district=restaurant.district;

          }
          if(restaurant.comments==undefined){
            this.addRestaurant.comments=previous.comments;
          } else{
            this.addRestaurant.comments=restaurant.comments;
          }
          if(restaurant.visited==undefined){
            this.addRestaurant.visited=previous.visited;

          }else{
            this.addRestaurant.visited=restaurant.visited;

          }
          if(restaurant.opinion==undefined){
            this.addRestaurant.opinion=previous.opinion;

          }else{
            this.addRestaurant.opinion=restaurant.opinion;

          }

          if(restaurant.rating==null){
            this.addRestaurant.rating=previous.rating;

          }else{
            this.addRestaurant.rating=restaurant.rating;

          }
       
          this.addRestaurant.id=restaurant.id;

        this.db.doc("/users/"+ localStorage.getItem("user_id") +"/Restaurant/"+ restaurant.id).update(this.addRestaurant);

        }



}
