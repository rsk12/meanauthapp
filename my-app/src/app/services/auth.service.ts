import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken :any;
  user:any;
  _url =  "users/register";
  _url1 = "users/authenticate"
  _url2 = "users/profile"
  constructor(private http : HttpClient,private router:Router ) { }

  //register Http service 
  registerUser(user){
    return this.http.post<any>(this._url,user);
  }

  //login Http service 
  loginUser(user){ 
    return this.http.post<any>(this._url1,user);
  }

  //getting Profile from backend Http Service 
  getProfile(){
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    return this.http.get<any>(this._url2);
  }
  
  storeUserData(token, user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user      = user ;
  }


  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout(){
    this.authToken = null;
    this.user      = null;
    localStorage.clear();
  }
 
  loggedIn(){
    return tokenNotExpired('id_token');
  }


  
}
