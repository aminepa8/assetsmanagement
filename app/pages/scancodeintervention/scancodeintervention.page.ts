import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner ,BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { InventaireService } from 'src/app/services/inventaire.service';
import { NavController,AlertController,LoadingController  } from '@ionic/angular';
import { FormControl ,FormsModule} from '@angular/forms';
import {myObj} from '../../interfaces/IntObj';
@Component({
  selector: 'app-scancodeintervention',
  templateUrl: './scancodeintervention.page.html',
  styleUrls: ['./scancodeintervention.page.scss'],
})
export class ScancodeinterventionPage implements OnInit {

  options : BarcodeScannerOptions;
  encodeText : string = '';
  encodedData : any={};
  scannedData : string='';
  constructor(
    private route: ActivatedRoute,
    public  navCtrl :NavController,
    public scanner :BarcodeScanner,
    private InventaireServ:InventaireService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
     ){}
     async presentAlert(message) {
      const alert = await this.alertCtrl.create({
      message: message,
      subHeader: 'Attention',
      buttons: ['Dismiss']
     });
     await alert.present(); 
     
    }


    async ScanBarCode(barCode:string){
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
        
        const results = await this.InventaireServ.SearchCodeBar(barCode).then((result)=>{
          console.log(result);
          
          let obj: myObj = JSON.parse(result.toString());
          console.log(obj.success);
          console.log(typeof(result));
           loading.dismiss();
          if(obj.success){
            this.navCtrl.navigateForward('intervention/'+barCode);
          }else{
            this.presentAlert('CodeBar Invalide :'+barCode);
          }
         
        }, (err) => {
          loading.dismiss();
          this.presentAlert('Error please try again');
          console.log(err);
                 
    });
        }
  scan(){
    this.options = {
      prompt : 'Scan your Barcode'
    }
    this.scanner.scan(this.options).then((data) => {

      this.scannedData = data.text;
      if(this.scannedData.trim()!=''){
        this.ScanBarCode(this.scannedData);
      }else{
        this.presentAlert('operation annule');
      }
    }, (err) =>{
      console.log('Error :',err);
    });
  }
  encode(){
    if (this.encodeText.trim()!='') {
      this.ScanBarCode(this.encodeText);
    }else{
      this.presentAlert('Valeur Invalide');
    }
    
   
  }
  ngOnInit() {
   // console.log(this.barCode);
  }

}
