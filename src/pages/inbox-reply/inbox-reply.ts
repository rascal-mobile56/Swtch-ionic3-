import { Component } from '@angular/core';
import { NavController, NavParams,  ViewController, LoadingController } from 'ionic-angular';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'page-inbox-reply',
  templateUrl: 'inbox-reply.html'
})
export class InboxReplyPage {

  profile_img:any;
  person_id:any;
  original_photo:any;
  transaction_id:string;
  conversation_id:string;
  transactionsData:any;
  conversationsData:any;
  messageData:any;
  start_time:any;
  end_time:any;
  start_date:any;
  end_date:any;
  total_hours:any;
  total_money:any;
  additional_price:any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public userService: UserService,

  ) {
    this.person_id = window.localStorage.getItem('person_id');
    this.transaction_id = navParams.get("transaction_id");
    this.conversation_id = navParams.get("conversation_id");

  }
  ionViewDidEnter(){
    this.profile_img = 'https://swtch.cloud' + window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
    if(this.conversation_id){
      this.getConversationsData(this.person_id, this.conversation_id);
    }else{
      this.getConversationsData(this.person_id, this.transaction_id);
    }


  }

  getConversationsData(person_id, id){
    let loading = this.loadingCtrl.create();
    loading.present();

    this.userService.getConversationsData(person_id, id)
      .subscribe(
        (data) => {
          if(data.success == false){
            loading.dismiss();
            console.log("No data");
         }else if(data.error == "error"){
           loading.dismiss();
           this.getTransactionsData(this.person_id, this.transaction_id);
         }else{
           loading.dismiss();
            console.log('ConversationData', data);
            this.conversationsData = data;
         }
      },
      (error) => {
        loading.dismiss();
        console.log(error);
      });
  }

  getTransactionsData(person_id, id){
    let loading = this.loadingCtrl.create();
    loading.present();

    this.userService.getTransactionsData(person_id, id)
      .subscribe(
        (data) => {
          if(data.success == false){
            loading.dismiss();
            console.log("No data");
         }else{
           loading.dismiss();
            console.log('TransactionsData', data);
            this.transactionsData = data;
            this.original_photo = data.conversation_other_party.avatar;
            this.messageData = data.messages;
            let start = data.transaction.booking.start_on +"T" + data.transaction.booking.start_time.split('T')[1];
            let end = data.transaction.booking.end_on + "T" + data.transaction.booking.end_time.split('T')[1];

            let start_on:any = new Date(start);
            let end_on:any = new Date(end);
            this.start_date = start_on.toString().split(' ')[0] + ', ' + start_on.toString().split(' ')[1] + ' ' + start_on.toString().split(' ')[2] +', '+ start_on.toString().split(' ')[3];
            this.end_date = end_on.toString().split(' ')[0] + ', ' + end_on.toString().split(' ')[1] + ' ' + end_on.toString().split(' ')[2] +', '+ end_on.toString().split(' ')[3];
            console.log(this.start_date);
            console.log(this.end_date);
            console.log(end_on.toString().split(' ')[4]);

            this.end_time = this.formatAMPM(end);
            this.start_time = this.formatAMPM(start);

            let hours = data.price_break_down_locals.duration;
            this.total_hours = hours/60;

            let money = data.price_break_down_locals.total.fractional;
            this.total_money = money / 100;

            let add_price = data.price_break_down_locals.additional_price.fractional;
            this.additional_price =  add_price / 100;
         }
      },
      (error) => {
        loading.dismiss();
        console.log(error);
      });
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

  replyMessage(){
      console.log("Sending");
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
