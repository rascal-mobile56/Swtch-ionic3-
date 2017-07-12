import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
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
    return this.http.get(this.baseService.listingsUrl)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }
  getProfileData(id){
    return this.http.get(this.baseService.listingsUrl + "/" + id)
      .map((res:Response)=>res.json())
      .catch((error:any)=>Observable.throw(error.json().error || 'Server error'));
  }

}
