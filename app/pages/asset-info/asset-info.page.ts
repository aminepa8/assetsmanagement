import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { AssetinfoservService } from 'src/app/services/assetinfoserv.service';
import { NavController,AlertController,LoadingController  } from '@ionic/angular';
import {CustomObj} from '../../interfaces/CustomObj';
import {objMateriel} from '../../interfaces/IntMateriel';
@Component({
  selector: 'app-asset-info',
  templateUrl: './asset-info.page.html',
  styleUrls: ['./asset-info.page.scss'],
})
export class AssetInfoPage implements OnInit {
  codesession:string;
  id: string;
  mat_id:any;
  mat_type:any;
  mat_modele:any;
  mat_nserie:any;
  mat_user:any;
  mat_etat:any;
  etat:string='';
  postInfo ={
    codebar :'',
    etat:'',
    utilisateur:'',
    codesession:''
    
  }
  a:boolean = false;
  b:boolean = false;
  c:boolean = false;
  d:boolean = false;
  constructor(
    private route: ActivatedRoute,
    public  navCtrl :NavController,
    private Assetinfoserv:AssetinfoservService,
    public alertCtrl: AlertController,
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
       
         this.mat_id = MatRes[0];
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
  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.codesession =this.route.snapshot.paramMap.get('code');
    console.log(this.id);
    console.log(this.codesession);
    await this.GetAssetInfo(this.id);
    //switch 
    console.log('Type : '+typeof(this.mat_etat));
    console.log('Valeur : '+this.mat_etat);
    if(this.mat_etat =='Active'){
      this.a = true;
      console.log(this.mat_etat =='Active');
    }
    if(this.mat_etat =='En Panne'){
      this.b = true;
      console.log(this.mat_etat =='En Panne');
    }
    if(this.mat_etat =='Reformee'){
      this.c = true;
      console.log(this.mat_etat =='Reformee');
    }
    if(this.mat_etat =='A Redeployer'){
      this.d = true;
      console.log(this.mat_etat =='A Redeployer');
    }
  }
  async AssetEtat(){
    const loading = await this.loadingCtrl.create({
      message: 'Please Wait...',
      
    });
    if(this.etat.trim() == ''){
      this.presentAlert("Please choose asset's etat ");
    }
    else if(this.mat_user.trim() == ''){
      this.presentAlert("Please enter username value ");
    }else{
    this.postInfo.codebar =  this.mat_id;
    this.postInfo.etat = this.etat;
    this.postInfo.utilisateur = this.mat_user;
    this.postInfo.codesession = this.codesession;
    await loading.present();
    console.log(this.postInfo);
    await this.Assetinfoserv.insertPosts(this.postInfo);
    loading.dismiss();
    this.presentAlert('Updated successfully !');
    console.log("Etat : " +this.etat +" User name : "+this.mat_user);
  }
  }
  
}
