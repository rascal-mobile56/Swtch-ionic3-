import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileEditPage }  from '../profile-edit/profile-edit';
import { AccountPage }  from '../account/account';
import { CarDetailsPage }  from '../car-details/car-details';
import { PaymentPage}  from '../payment/payment';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {


  constructor(
    public navCtrl: NavController,

  ) {

  }

  goEditProfilePage(){
    console.log("ProfileEditPage");
    this.navCtrl.push(ProfileEditPage);
  }
  goAccountPage(){
    console.log("AccountPage");
    this.navCtrl.push(AccountPage);
  }
  goCarDetailsPage(){
    console.log("CarDetailsPage");
    this.navCtrl.push(CarDetailsPage);
  }
  goPaymentPage(){
    console.log("PaymentPage");
    this.navCtrl.push(PaymentPage);
  }



}
