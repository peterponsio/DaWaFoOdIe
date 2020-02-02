import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AutenticacionesService } from './autenticaciones.service';

@Injectable({
  providedIn: 'root'
})
export class VisualesService {

  constructor(private alert: AlertController, public toastController: ToastController , private aut:AutenticacionesService) { }


  //////////////Toast////////////////////////////////////////

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
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



///////////////////////////////Alert to recover password///////////////////////////////////////////////////////////////////


  async Forgot_pass() {

    const alert = await this.alert.create({
      header: 'recover password',
      inputs: [
        {
          name: 'mail',
          type: 'text',
          placeholder: 'Put you mail'
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

            this.presentToast("Check your email to change the password");

            this.aut.fortgot(datos.mail);

          }
        }
      ]
    });

    await alert.present();
  }
////////////////////////////////////////////////////////////////////////////////////////////////
 
}
