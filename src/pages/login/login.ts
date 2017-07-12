import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
// import { HomeTabPage } from '../home-tab-page/home-tab-page';
import { ForgotPage } from '../forgot/forgot';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public user: any = {email:'dev1plus@fliptechdev.com', password: 'Fl1pT3chD3v'};

  constructor(
    public navCtrl: NavController,

  ) {
  }


   ValidationEmail (email)
   {
     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(email);
   }

  goHomePage(){
     console.log('go HomePage');
      //  this.navCtrl.setRoot(HomeTabPage);
       this.navCtrl.setRoot(TabsControllerPage);
   }

  goForgotPage(){
    console.log("go ForgotPage");
    this.navCtrl.push(ForgotPage);
  }

  backHome(){
    console.log("backHome");
    this.navCtrl.pop();
  }
}
