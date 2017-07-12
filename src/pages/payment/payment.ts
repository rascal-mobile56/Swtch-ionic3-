import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {

  public provinces:any = { title:'', value:''};

  constructor(
    public navCtrl: NavController,

  ) {

    this.provinces = [ { title:"AB", value:"AB"},{ title:"BC", value:"BC"},{ title:"MB", value:"MB"},
                  { title:"NB", value:"NB"}, { title:"NL", value:"NL"}, { title:"NS", value:"NS"},
                  { title:"NT", value:"NT"}, { title:"NU", value:"NU"}, { title:"ON", value:"ON"},
                  { title:"PE", value:"PE"}, { title:"QC", value:"QC"}, { title:"SK", value:"SK "},
                  { title:"YK", value:"YK"}];
  }


}
