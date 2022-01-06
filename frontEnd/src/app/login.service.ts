import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //login url of the api
  private loginURL = "http://localhost:3002/api/login";
  constructor(private http: HttpClient, private router: Router) { }

    //login function
    login(user:any){
      return this.http.post(this.loginURL, user, {responseType:'text'})     
    }

    //user logged in
    checkUserLoggedIn(){
      return !!localStorage.getItem('username')
    }
    //logOut function
    logOut(){
      localStorage.removeItem('username')
      this.router.navigate(['/login'])
    }
}
