import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router  : Router,
    private authService : AuthService,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authService.logout();
    this._flashMessagesService.show('Your logged out  ',{cssClass:'alert-success',timeout:3000});
    this.router.navigate(['/login']);
    return false;
  }
}
