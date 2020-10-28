import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NavController,AlertController,LoadingController  } from '@ionic/angular';
import { FormControl ,FormsModule} from '@angular/forms';
import {myObj} from '../../interfaces/IntObj';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  sessioncode:string='';
  results :Observable<any>;
  
  constructor(
    public navCtrl: NavController,
    private auth:AuthService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    
    ) { }

  async presentAlert(message) {
    const alert = await this.alertCtrl.create({
    message: message,
    subHeader: 'Attention',
    buttons: ['Dismiss']
   });
   await alert.present(); 
  }
  
 async myLogin(){
  if (this.sessioncode.trim()=='') {
    this.presentAlert('Invalide Valeur');
  } else {
    
  
  const loading = await this.loadingCtrl.create({
    message: 'Please Wait...',
    
  });
  await loading.present();
  //added this 
  setTimeout(() => {
    loading.dismiss();
    this.presentAlert('Veuillez vérifier votre connexion !');
  }, 30000);
  // this
    console.log(' enter the func');
    
    const results = await this.auth.login(this.sessioncode).then((result)=>{
      console.log(result);
      
      let obj: myObj = JSON.parse(result.toString());
      console.log(obj.success);
      console.log(typeof(result));
       loading.dismiss();
      if(obj.success){
        //this.navCtrl.navigateForward('scan-code');
        this.navCtrl.navigateForward('scan-code/'+this.sessioncode);
      }else{
        this.presentAlert('Code Session Invalide :'+this.sessioncode);
      }
     
    }, (err) => {
      loading.dismiss();
      this.presentAlert('Verifiez votre internet connexion');
      console.log(err);
     
      
      
});
    }
  }
    //fin login func
    ngOnInit() {
    }
  }
  


