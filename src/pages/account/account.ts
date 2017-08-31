import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmailAddPage } from '../email-add/email-add';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  profile_img:any;

  constructor(
    public navCtrl: NavController,

  ) {
    this.profile_img = 'https://swtch.cloud' + window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }
  ionViewDidEnter(){
    this.profile_img = window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }
  goEmailAddPage(){
    console.log("go EmailAddPage")
    this.navCtrl.push(EmailAddPage);
  }

}
