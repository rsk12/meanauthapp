import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name     : String;
  username : String;
  email    : String;
  password : String;


  constructor(
    private router  : Router,
    private authService : AuthService,
    private validateService:ValidateService,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  
onRegisterSubmit(){

  let user = {
    name : this.name,
    username : this.username,
    email : this.email,
    password : this.password,
  }
  if(!this.validateService.validateRegister(user)){
  
    this._flashMessagesService.show('Please fill all the fields',{cssClass: 'alert-danger',timeout:3000});
    return false;
  }
  if(!this.validateService.validateEmail(user.email)){
    this._flashMessagesService.show('Please enter valid email',{cssClass:'alert-danger',timeout:3000});
    return false;
  }
  
  this.authService.registerUser(user).subscribe(data=>{
    if(data.success){
      this._flashMessagesService.show('Your are now registered and can log in ',{cssClass: 'alert-success',timeout:3000});
      this.router.navigate(['/login']);
    }
    else{
      this._flashMessagesService.show('something went wrong ,try again ',{cssClass:'alert-danger',timeout:3000});
      this.router.navigate(['/register']);
    }
  });

  }
 

}


