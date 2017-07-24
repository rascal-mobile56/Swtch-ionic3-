import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmailAddPage } from '../email-add/email-add';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(
    public navCtrl: NavController,

  ) {
  }
goEmailAddPage(){
  console.log("go EmailAddPage")
  this.navCtrl.push(EmailAddPage);
}

}
