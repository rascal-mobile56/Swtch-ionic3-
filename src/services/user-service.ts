import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from "./base-service";
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(
    public http: Http,
    public baseService: BaseService
  ) {
  }

  getProfiles(){
    return this.http.get(this.baseService.baseUrl + "listings")
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  getProfileData(id){
    return this.http.get(this.baseService.baseUrl + "listings/" + id)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  callbackData(accessToken){
    return this.http.get(this.baseService.callbackUrl + "?mobile=true&access_token=" + accessToken)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  getPersonData(person_id){
    return this.http.get(this.baseService.peopleUrl + person_id)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  updatePersonData(person_id, body){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseService.peopleUrl + person_id + '?' + body, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));

  }

  getCarDetailsData(person_id){
    return this.http.get(this.baseService.peopleUrl + person_id + '/car_details/new')
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  updateCarDetailsData(person_id, body){
    console.log(body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.baseService.peopleUrl + person_id + '/car_details?' + body, options)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

  getInboxData(person_id){
    return this.http.get(this.baseService.peopleUrl + person_id + '/inboxes')
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
}
