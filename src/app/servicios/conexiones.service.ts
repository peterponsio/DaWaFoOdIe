import { Users } from './../model/user.interface';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Restaurants } from './../model/restaurant.interface';

import { AlertController, LoadingController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import  { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { from } from 'rxjs';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class ConexionesService {


   options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.ALLMEDIA
  }

  optionsPicker = {
    // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
    // selection of a single image, the plugin will return it.
    maximumImagesCount: 1,
    
    // max width and height to allow the images to be.  Will keep aspect
    // ratio no matter what.  So if both are 800, the returned image
    // will be at most 800 pixels wide and 800 pixels tall.  If the width is
    // 800 and height 0 the image will be 800 pixels wide if the source
    // is at least that wide.
    width: 300,
    height: 300,
    
    // quality of resized image, defaults to 100
    quality: 100,

    // output type, defaults to FILE_URIs.
    // available options are 
    // window.imagePicker.OutputType.FILE_URI (0) or 
    // window.imagePicker.OutputType.BASE64_STRING (1)
    outputType: 1
};

  constructor(private camera: Camera,private storage: AngularFireStorage,public loadingController: LoadingController,private alertController:AlertController,private aut: AngularFireAuth,private ruta:Router,private fb: Facebook,private db:AngularFirestore,private imagePicker: ImagePicker) { }



   addRestaurant:Restaurants={
    id: "",
    name: "",
    type: "",
    district:"",
    comments: "",
    visited:false,
    opinion:"",
    rating: 0,
    img:"",
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
    this.addRestaurant.img=data.img;

    this.db.doc("/users/"+ localStorage.getItem("user_id") +"/Restaurant/"+ this.addRestaurant.id).set(this.addRestaurant);

    console.log(this.addRestaurant);

  }


  ////////////////////////////////////////////////////////////////////////////////

  async getRestaurantsList(){
    let userData:AngularFirestoreCollection=this.db.collection<Restaurants>("/users/"+ localStorage.getItem("user_id") +"/Restaurant/");

          return userData;

        }
        async getUser(){
          var user = firebase.auth().currentUser;
      
                return user;
      
              }

              async getUserData(){
                let userData:AngularFirestoreCollection=this.db.collection<Users>("/users/");
            
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
          this.addRestaurant.img=restaurant.img;

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
          this.addRestaurant.img=restaurant.img;

        this.db.doc("/users/"+ localStorage.getItem("user_id") +"/Restaurant/"+ restaurant.id).update(this.addRestaurant);

        }


      async  delete(id){
        
            const alert =  await this.alertController.create({
              header: 'Delete Restaurant!',
              message: 'This Restaurant gonna be  <strong>deleted permanently</strong>!!!',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                   
                  }
                }, {
                  text: 'Delete!!',
                  handler: () => {
                    this.db.doc("/users/"+ localStorage.getItem("user_id") +"/Restaurant/"+ id).delete();
                   
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
            this.addRestaurant.img=restaurant.img;
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
          this.addRestaurant.img=previous.img;

        this.db.doc("/users/"+ localStorage.getItem("user_id") +"/Restaurant/"+ restaurant.id).update(this.addRestaurant);

        }



        UploadImG(){

          this.imagePicker.getPictures(this.optionsPicker).then(async (results) => {
            
            let base64Image = 'data:image/jpeg;base64,' + results;
            
        
            let ruta = this.db.createId();
            let route = `/${ruta}`;
            const fileRef = this.storage.ref(route);
            const task = fileRef.putString(base64Image, 'data_url');
            task.snapshotChanges().pipe(
              finalize(() => {
                fileRef.getDownloadURL().subscribe(url => {
                  localStorage.setItem("url",url);
                });
              })
            ).subscribe();
          }, (err) => {
            alert(err);
          });
        }
          

        
            
        editImG(){

        }

        async presentLoading() {
          const loading = await this.loadingController.create({
            message: 'Uploading Photo',
            duration: 3000
          });
          await loading.present();
      
          const { role, data } = await loading.onDidDismiss();
      
          console.log('Loading dismissed!');
        }
      
        



}
