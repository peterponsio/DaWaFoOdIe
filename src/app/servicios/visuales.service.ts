import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class VisualesService {

  constructor(private alert: AlertController, public toastController: ToastController ) { }


  //////////////Toast////////////////////////////////////////

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  /////////////////////Alert Controller///////////////////////////////////////////////////////

  async presentAlertPrompt(id: string) {

   
    const alert = await this.alert.create({
      header: 'Edit Film',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Film name'
        },
        {
          name: 'duration',
          type: 'number',
          placeholder: 'Duration'
        },


      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (datos) => {

            console.log(datos);
          
          }
        }
      ]
    });

    await alert.present();
  }

 
}
