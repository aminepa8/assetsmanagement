import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { AssetinfoservService } from 'src/app/services/assetinfoserv.service';
import { InterventionserviceService } from 'src/app/services/interventionservice.service';
import { NavController,AlertController,LoadingController  } from '@ionic/angular';
import {CustomObj} from '../../interfaces/CustomObj';
import {objMateriel} from '../../interfaces/IntMateriel';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.page.html',
  styleUrls: ['./intervention.page.scss'],
})
export class InterventionPage implements OnInit {
  checkboxenpanne:boolean=false;
  confirmCheck:boolean=false;
  observationtext:string='';
  id: string;
  mat_type:any;
  mat_modele:any;
  mat_nserie:any;
  mat_user:any;
  mat_etat:any;
  etat:string='';
  postInfo ={
    id_materiel_fk :'',
    observation:'',
    etat:'', 
  }
  constructor(
    private route: ActivatedRoute,
    public  navCtrl :NavController,
    private InterventionServ:InterventionserviceService,
    public alertCtrl: AlertController,
    private Assetinfoserv:AssetinfoservService,
    public loadingCtrl: LoadingController,
    private router:Router
  ) { }
  async presentAlert(message) {
    const alert = await this.alertCtrl.create({
    message: message,
    subHeader: 'Attention',
    buttons: ['Dismiss']
   });
   await alert.present(); 
  }
  //get Asset information by CodeBar
  async GetAssetInfo(barCode:string){
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      
    });
    
    await loading.present();
      console.log(' enter the func');
      
      
      const results = await this.Assetinfoserv.SearchCodeBar(barCode).then((result)=>{
       // console.log(result);
        
        let obj: CustomObj = JSON.parse(result.toString());
       let MaterielObj :objMateriel = obj.data;
       let MatRes = Object.values(MaterielObj[0]);
        console.log(Object.values(MaterielObj[0]));
       
         this.mat_type = MatRes[1];
         this.mat_modele =MatRes[2];
         this.mat_nserie = MatRes[3];
         this.mat_user = MatRes[4];
         this.mat_etat = MatRes[5];
        console.log(typeof(MatRes[1]));
        console.log(MatRes[3]);
        console.log(MatRes[4]);
        console.log(MatRes[5]);
        
      //  console.log(MaterielObj.type);
       
      //  console.log(typeof(result));
      }, (err) => {
        this.presentAlert('Error please try again');
        console.log(err);
        loading.dismiss();
               
  });
  loading.dismiss();
      }
      //FIN FUNC
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('code');
    this.GetAssetInfo(this.id);
   
  }
 async AssetIntervention(){
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      
    }); 
    if(this.observationtext.trim() == ''){
      this.presentAlert("Please choose asset's etat ");
    }else{
      this.postInfo.id_materiel_fk = this.id;
      this.postInfo.observation = this.observationtext;
    if (this.checkboxenpanne) {
      this.postInfo.etat ="true";
    }else{
      this.postInfo.etat ="false";
    }
      
      await loading.present();
      //added this 
      setTimeout(() => {
        loading.dismiss();
        this.presentAlert('Veuillez vérifier votre connexion !');
      }, 30000);
      // this
      console.log(this.postInfo);
      await this.InterventionServ.insertIntervention(this.postInfo);
      loading.dismiss();
      this.presentAlert('Updated successfully !');
      //console.log("Etat : " +this.etat +" User name : "+this.mat_user);
    }
    
  }
}
