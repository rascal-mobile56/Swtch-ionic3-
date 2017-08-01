import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, } from 'ionic-angular';
import { UserService } from '../../services/user-service';
import { MessagesSendingPage } from '../message-sending/message-sending';

@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoPage {

  // userInfoData:any = {}
  public id:string;
  public userInfoData:any = { title:'', open: false };
  public userAuthor:any = { id:'', username:'', given_name:'', family_name:'', description:'', image_file_name:''};
  public bg_img:string;
  public rate:string;
  public profile_img:any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public userService: UserService,
  ) {

    this.id = navParams.get("id");
    console.log(this.id);
    this.profile_img = window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
  }

  ionViewDidLoad(){
    this.loadData();
  }


  loadData(){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.userService.getProfileData(this.id)
      .subscribe(
        (data) => {
          loading.dismiss();
          if(data.success == false){
            console.log("No data");
         }else{
           this.userInfoData = data.listing;
           this.userAuthor = data.listing.author;
           console.log(this.userInfoData);
           if(this.userInfoData.listing_images.length > 0){
             this.bg_img = 'https://swtch.cloud/system/images/'+ this.userInfoData.listing_images[0].id + '/big/' + this.userInfoData.listing_images[0].image_file_name;
           }else{
             this.bg_img = 'assets/image/blank.png';
           }
           if(this.userInfoData.additional_price_cents == 0){ this.rate = "$1.5-2.5/h" }
           else if(this.userInfoData.additional_price_cents == 100){ this.rate = "$2.5-3.5/h" }
           else if(this.userInfoData.additional_price_cents == 0){ this.rate = "$2.75-3.75/h" }
         }
        },
      (error) => {
        console.log(error);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  sendMessagePage(name){
    this.navCtrl.push(MessagesSendingPage,{
      name: this.userAuthor.given_name,
    });
  }
}
