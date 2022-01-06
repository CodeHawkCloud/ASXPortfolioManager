import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontEnd';

  constructor(public loginService:LoginService){}

  //check user is logged in
  checkUserLoggedIn(){
    this.loginService.checkUserLoggedIn()
  }

  //logout user
  logOut(){
    this.loginService.logOut()
  }

}
