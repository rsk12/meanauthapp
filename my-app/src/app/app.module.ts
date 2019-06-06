import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule , Routes } from '@angular/router';
import {AuthGuard } from './guards/auth.guard';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule, FlashMessagesService  } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';

import { HttpClientModule } from '@angular/common/http';


const appRoutes : Routes = [
  {path:'register',component: RegisterComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    HttpClientModule
  ],
  providers: [ValidateService,FlashMessagesService,AuthService,AuthGuard],

  bootstrap: [AppComponent]
})
export class AppModule { }
