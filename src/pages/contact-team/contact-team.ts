import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-contact-team',
  templateUrl: 'contact-team.html'
})
export class ContactTeamPage {

  constructor(
    public navCtrl: NavController,

  ) {
  }
  backPage(){
    this.navCtrl.pop();
  }

}
