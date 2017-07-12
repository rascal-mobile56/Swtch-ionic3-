import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { HomeTabPage } from '../home-tab-page/home-tab-page';



@Component({
  selector: 'page-agree',
  templateUrl: 'agree.html'
})
export class AgreePage {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,


  ) {

  }


  goMainPage(){
    console.log('go MainPage');
      // this.navCtrl.setRoot(HomePage);
      this.navCtrl.setRoot(TabsControllerPage);
  }

  backHome(){
    console.log("back SignupPage");
    this.navCtrl.pop();
  }

}
