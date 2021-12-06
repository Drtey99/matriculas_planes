import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  data;

  private url = "http://localhost:1337";

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  login(identifier, password) {
    axios
      .post(`${this.url}/auth/local`, {
        identifier: identifier,
        password: password,
      })
      .then(response => {
        // Handle success.
        console.log('Well done!');
        this.data = response.data.user;
        localStorage.setItem('jwt',response.data.jwt);
        this.router.navigate(['main']);
        
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
        const fp = document.getElementById('forgotten-password');
        fp.innerHTML = `
            <a href="https://google.es" style="color: #3195d1;
            font-weight: bold;">Recuperar contraseña</a>
        `
      });
  }

  isAuth():boolean {
    const jwt = localStorage.getItem('jwt');
    if(this.jwtHelper.isTokenExpired(jwt) || !localStorage.getItem('jwt')) {
      return false;
    }
    return true;
  }

  logout(){
    localStorage.removeItem('jwt');
    this.router.navigate(['signin']);
  }

}
