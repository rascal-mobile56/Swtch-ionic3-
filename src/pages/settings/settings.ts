import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { AccountPage } from '../account/account';
// import { NotificationPage } from '../notification/notification';
import { InboxPage } from '../inbox/inbox';
import { CarDetailsPage } from '../car-details/car-details';
import { PaymentPage } from '../payment/payment';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  profile_img:any;
  constructor(
    public navCtrl: NavController,
  ) {

  }
  ionViewDidEnter(){
    this.profile_img = 'https://swtch.cloud' + window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }
  goProfilePage(){
    console.log('go Profile Info Page');
    this.navCtrl.push(ProfileEditPage);
  }
  goAccountPage(){
    console.log('go Account Page');
    this.navCtrl.push(AccountPage);
  }
  // goNotiPage(){
  //   console.log('go Notification Page');
  //   this.navCtrl.push(NotificationPage);
  // }
  goInboxPage(){
    console.log('goMessageBox');
    this.navCtrl.push(InboxPage);
  }

  goCarDetailsPage(){
    console.log('go Car Details Page');
    this.navCtrl.push(CarDetailsPage);
  }
  goPaymentPage(){
    console.log('go Payment Page');
    this.navCtrl.push(PaymentPage);
  }

}
