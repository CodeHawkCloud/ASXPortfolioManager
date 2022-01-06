import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  //binding of html data
  signUpData:any = {}

  constructor( private signUpService: SignUpService) { }

  ngOnInit(): void {
  }

  //signUp function
  signUp(){

    this.signUpService.signUp(this.signUpData).subscribe(
      //if successful
      res=>alert("User Registered Successfully! Please login to proceed !"),
      //if unsuccessful
      error=>alert("User Registration Unsuccessful !")
    )
  }

}
