import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : String;
  password : String;

  constructor(
    private router  : Router,
    private authService : AuthService,
    private validateService:ValidateService,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    let user = {
      username : this.username,
      password : this.password,
    }

    this.authService.loginUser(user).subscribe(data=>{
      if(data.success){
        this.authService.storeUserData(data.token,data.user);
        this._flashMessagesService.show('Successfully Logged!',{cssClass: 'alert-success',timeout:3000});
        this.router.navigate(['/dashboard']);
      }
      else{
        this._flashMessagesService.show('something went wrong ,try again ',{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/login']);
      }
    });

  }

}
