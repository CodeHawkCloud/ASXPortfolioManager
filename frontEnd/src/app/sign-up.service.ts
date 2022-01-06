import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class SignUpService {

  //signUp url of the api
  private signUpURL = "http://localhost:3002/api/signUp"
  constructor(private http: HttpClient) { }

  //signUp function
  signUp(user:any){
      return this.http.post(this.signUpURL, user)
  }
}
