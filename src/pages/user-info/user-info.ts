import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { MessagesSendingPage } from '../message-sending/message-sending';

@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoPage {

  // userInfoData:any = {}
  public id:string;
  public userInfoData:any = { title:'', open: false };
  public userAuthor:any = { id:'', username:'', given_name:'', family_name:'', image_file_name:''};
  public bg_img:string;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public userService: UserService,
  ) {
    this.id = navParams.get("id");
    console.log(this.id);
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
           this.userInfoData = data;
           this.userAuthor = data.author;
           console.log(this.userInfoData);
           if(data.listing_images.length > 0){
             this.bg_img = 'https://swtch.cloud/system/images/'+ data.listing_images[0].id + '/big/' + data.listing_images[0].image_file_name;
           }else{
             this.bg_img = 'assets/image/4.jpg';
           }
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
