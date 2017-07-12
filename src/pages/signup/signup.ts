import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AgreePage } from '../agree/agree';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

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


  gotoAgreePage(){
    console.log("go ForgotPage");
    this.navCtrl.push(AgreePage);
  }


  backHome(){
    console.log("backHome");
    this.navCtrl.pop();
  }
}
