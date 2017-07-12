import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-social-sign',
  templateUrl: 'social_sign.html'
})
export class SocialSignPage {

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

   gotoLoginPage(){
     console.log("go LoginPage");
     this.navCtrl.push(LoginPage);

   }
   gotoSignupPage(){
     console.log("go SignupPage");
     this.navCtrl.push(SignupPage);
   }
}
