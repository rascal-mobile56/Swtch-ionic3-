import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { UserService } from '../../services/user-service';
import { MessagesSendingPage } from '../message-sending/message-sending';

declare var google;

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {

  @ViewChild('map') mapElement: ElementRef;
    map: any;

    public id:string;
    public profileData:any = { vailability:'', open:'', title:'',description:'', price_cents:'' };
    public author:any = { family_name:'', given_name:'', id:'', image_file_name:''};
    public location:any = { address:'', latitude:'', longitude:''}
    public bg_img:string;
    eventSource;
    viewTitle;
    isToday: boolean;
    calendar = {
        mode: 'month',
        currentDate: new Date()
    };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
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
           this.profileData = data.listing;
           console.log(this.profileData);
           this.author = data.listing.author;
           this.location = data.listing.location;

           if(this.profileData.listing_images.length > 0){
             this.bg_img = 'https://swtch.cloud/system/images/'+ this.profileData.listing_images[0].id + '/big/' + this.profileData.listing_images[0].image_file_name;
           }else{
             this.bg_img = 'assets/image/4.jpg';
           }

           this.loadMap(this.location.latitude, this.location.longitude);
           this.addMarker();
         }
        },
        (error) => {
          console.log(error);
      });
  }

  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
        var date = new Date();
        var eventType = Math.floor(Math.random() * 2);
        var startDay = Math.floor(Math.random() * 90) - 45;
        var endDay = Math.floor(Math.random() * 2) + startDay;
        var startTime;
        var endTime;
        if (eventType === 0) {
            startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
            if (endDay === startDay) {
                endDay += 1;
            }
            endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
            events.push({
                title: 'All Day - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
        } else {
            var startMinute = Math.floor(Math.random() * 24 * 60);
            var endMinute = Math.floor(Math.random() * 180) + startMinute;
            startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
            events.push({
                title: 'Event - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: false
            });
        }
    }
    return events;
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };

  loadMap(lat, lng) {
    let latLng = new google.maps.LatLng(lat, lng);

    let mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  sendMessagePage(name){
    this.navCtrl.push(MessagesSendingPage,{
      name: this.author.given_name,
    });
  }

}
