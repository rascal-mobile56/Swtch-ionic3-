import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PayReplyPage } from '../pay-reply/pay-reply';
import { UserService } from '../../services/user-service';
import { InboxReplyPage } from '../inbox-reply/inbox-reply'

@Component({
  selector: 'page-rent',
  templateUrl: 'rent.html'
})
export class RentPage {

  profile_img:any;
  id:string;
  my_id:string;
  params:string;

  title:string;
  data:any;
  my_username:string;
  client_name:string;

  start_day:string;
  end_day:string;

  start_hour:any;
  end_hour:any;

  total_hour: number;
  total_money: number;
  card_num:string;
  payment_number:string;

  last_number:string;

  message: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public userService: UserService,

  ) {

    this.id = navParams.get("id");
    this.params = navParams.get("params");
    this.my_id = window.localStorage.getItem('person_id');
    this.data = navParams.get("data");
    console.log(this.data);
  }

  ngOnInit(){

    this.getData()

    }
    getData(){

      this.client_name =  this.data.author.display_name;
      this.title = this.data.listing.title;
      let s_day = new Date(this.data.price_break_down_locals.start_on);
      this.start_day = s_day.toDateString();
      let e_day =  new Date(this.data.price_break_down_locals.end_on);
      this.end_day = e_day.toDateString();

      this.start_hour = this.formatAMPM(this.data.price_break_down_locals.start_time);
      this.end_hour = this.formatAMPM(this.data.price_break_down_locals.end_time);

      let hours = this.data.price_break_down_locals.quantity;
      this.total_hour =  hours / 60;
      let money = this.data.price_break_down_locals.total.fractional;
      this.total_money = money / 100;
      this.last_number = this.data.last_4;

      this.message  = 'Hello. I woruld like to reserve your charger from ' +
                      this.start_day + ' at ' + this.start_hour + ' to ' +
                      this.end_day + ' at ' + this.end_hour;
    }



  formatAMPM(date) {
    let newDate = new Date(date);
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    let  ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    let hours_str = hours ? hours : 12; // the hour '0' should be '12'
    let minutes_str = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours_str + ':' + minutes_str + ' ' + ampm;
    return strTime;
}

ionViewDidEnter(){
  this.profile_img = 'https://swtch.cloud' + window.localStorage.getItem('profile_img');
  console.log(this.profile_img);
}

sendMessage(){

  let loading = this.loadingCtrl.create();
  loading.present();

  this.userService.uploadBookingData(this.id, this.params)
    .subscribe(
      (data) => {
        loading.dismiss();
        if(data.success == false){
          console.log("No data");
          let alert = this.alertCtrl.create({
              title: 'Error',
              buttons: ['Dismiss']
            });
            alert.present();
       }else{
         console.log('booking' + JSON.stringify(data));
         console.log(data);
         let transaction_id = data.transaction.id;
         this.navCtrl.setRoot(InboxReplyPage,{ transaction_id: transaction_id});
       }
    },
    (error) => {
      loading.dismiss();
      let alert = this.alertCtrl.create({
          title: 'Server Error',
          buttons: ['Dismiss']
        });
        alert.present();
      console.log(error);
    });
  }



}
