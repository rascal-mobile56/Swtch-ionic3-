import { Component } from '@angular/core';
import { ViewController, NavController, LoadingController, NavParams, AlertController } from 'ionic-angular';
import { RentPage } from '../rent/rent';
import { UserService } from '../../services/user-service';
import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  public id:string;
  public user_id:string;
  public person_id:string;
  public start_on:any;
  public end_on:any;
  public time_list = [];
  public from_timer:any={value:''};
  public to_timer:any={value:''};
  public coupon_code:string;
  public todayValue:any;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private datePicker: DatePicker,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams,

    public userService: UserService,
  ) {


    this.id = navParams.get("id");
    this.user_id = navParams.get("user_id");
    this.person_id = window.localStorage.getItem('person_id');

    // let today = new Date();

    // this.todayValue = new Date();
    // console.log('today', this.todayValue);
    var d = new Date(),
       month = '' + (d.getMonth() + 1),
       day = '' + d.getDate(),
       year = d.getFullYear();
     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;
    this.todayValue = year+ '-' + month + '-' + day;
    console.log('today', this.todayValue);


    let hour_str:string;
    let hour : number;
    for (var i=0; i<96; i++){
      if (i<48){
        hour = Math.floor(i/4);
      }else{
        hour = Math.floor((i-48)/4);
      }

      if(hour == 0){
        hour_str = '12';
      }else if (hour<10){
        hour_str = '0' + hour;
      }else{
        hour_str = hour.toString();
      }

      let min;
      if (i % 4 == 0){
        min = '00';
      }else if(i %4 == 1){
        min = '15'
      }else if(i %4 == 2){
        min = '30';
      }else{
        min = '45';
      }

      let am_pm;
      if (i<48){
        am_pm = "AM";
      }else{
        am_pm = "PM";
      }
      let time = hour_str + ' : ' + min + ' ' + am_pm;
      this.time_list.push(time);
    }

  }

  bookingData(){
    let loading = this.loadingCtrl.create();
    loading.present();

    let start_time =  this.makevalue(this.from_timer.value);

    let end_time = this.makevalue(this.to_timer.value);

    let coupon_code;
    if(this.coupon_code == undefined){
      coupon_code = '';
    }else{
      coupon_code = this.coupon_code;
    }

    if(this.end_on == '' || this.end_on == undefined){
        let alert = this.alertCtrl.create({
          title: 'Empty Booking From Date',
          subTitle: 'Enter booking form date',
          buttons: ['OK']
        });
        alert.present();
    }else if(this.start_on == '' || this.start_on == undefined){
      let alert = this.alertCtrl.create({
        title: 'Empty Booking To Date',
        subTitle: 'Enter booking to date',
        buttons: ['OK']
      });
      alert.present();
    }else if(this.from_timer.value == ''){
      let alert = this.alertCtrl.create({
        title: 'Empty  From Timer',
        subTitle: 'Enter from timer',
        buttons: ['OK']
      });
      alert.present();
    }else if(this.to_timer.value == ''){
      let alert = this.alertCtrl.create({
        title: 'Empty To Timer',
        subTitle: 'Enter to timer',
        buttons: ['OK']
      });
      alert.present();

    }else{

      let params = 'coupon_code=' + coupon_code + '&end_on=' + this.end_on + '&end_time=' +
                  end_time + '&start_on=' + this.start_on + '&start_time=' + start_time + '&person_id=' + this.person_id;

      console.log(params);

      loading.dismiss();
      this.userService.getBookingData(this.id, params)
        .subscribe(
          (data) => {
            loading.dismiss();
            console.log(data);
            if(data.success == false){
              console.log("No data");
              let alert = this.alertCtrl.create({
                  title: 'Error',
                  buttons: ['Dismiss']
                });
                alert.present();
                this.dismiss();
           }else{
               loading.dismiss();
             if(data.error){
               let alert = this.alertCtrl.create({
                   title: 'Error',
                   subTitle: data.error,
                   buttons: ['Dismiss']
                 });
                 alert.present();
                this.dismiss();
             }else{
               console.log('booking' + JSON.stringify(data));
                this.navCtrl.push(RentPage,{id: this.id, data: data, params:params});
             }
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
          this.dismiss();
        });
    }

    loading.dismiss();
  }

  makevalue(value){
    let aa = value.split(':');
    let bb = aa[0] + '%3A' + aa[1];
    let cc = bb.split(' ');
    let dd = cc[0] + cc[1] + cc [2] + '+' + cc[3];
    return dd;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
