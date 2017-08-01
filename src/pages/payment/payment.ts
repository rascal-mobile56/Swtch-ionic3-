import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {

  public provinces:any = { title:'', value:''};
  public profile_img:any;

  constructor(
    public navCtrl: NavController,

  ) {
    this.profile_img = window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
    this.provinces = [ { title:"AB", value:"AB"},{ title:"BC", value:"BC"},{ title:"MB", value:"MB"},
                  { title:"NB", value:"NB"}, { title:"NL", value:"NL"}, { title:"NS", value:"NS"},
                  { title:"NT", value:"NT"}, { title:"NU", value:"NU"}, { title:"ON", value:"ON"},
                  { title:"PE", value:"PE"}, { title:"QC", value:"QC"}, { title:"SK", value:"SK "},
                  { title:"YK", value:"YK"}];
  }


}
