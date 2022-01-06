import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //binding of html data
  loginData:any = {}

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  //login user
  login(){

    this.loginService.login(this.loginData).subscribe(
      //if successful
      res=>{
        //store username in local storage
        localStorage.setItem('username', res)
        //navigate to the home component
        this.router.navigate(['/home'])
      },
      //if unsuccessful
      error=>alert("Login unsuccesful!")
    )
  }

}
