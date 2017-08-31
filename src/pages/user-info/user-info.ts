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
  public user_Recieve:any;

  public review_Value: number;
  public review_ok: number;
  public review_percent: number;

  public userAuthor:any = { id:'', username:'', given_name:'', family_name:'', description:'', image_file_name:''};
  public bg_img:string;
  public min_rate:string;
  public max_rate:string;
  public profile_img:any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public userService: UserService,
  ) {

    this.id = navParams.get("id");
    console.log('author_id', this.id);
  }

  ionViewDidLoad(){
    this.loadData();
  }
  ionViewDidEnter(){
    this.profile_img = 'https://swtch.cloud' + window.localStorage.getItem('profile_img');
    console.log(this.profile_img);
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
           console.log(data);
           this.userInfoData = data.listing;
           this.user_Recieve = data.user_testimonials;

           this.userAuthor = data.listing.author;

           if(this.userInfoData.listing_images.length > 0){
             this.bg_img = 'https://swtch.cloud/system/images/'+ this.userInfoData.listing_images[0].id + '/big/' + this.userInfoData.listing_images[0].image_file_name;
           }else{
             this.bg_img = 'assets/image/blank.png';
           }
           this.min_rate = data.min_max[0];
           this.max_rate = data.min_max[1];

           if(this.user_Recieve.length > 0){
             this.review_Value = this.user_Recieve.length;

             this.review_ok = 0;
             for(var i=0; i<this.user_Recieve.length; i++){
               this.review_ok += this.user_Recieve[i].grade;
             }
             this.review_percent = this.review_ok / this.review_Value * 100;
           }
         }
        },
      (error) => {
        loading.dismiss();
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
