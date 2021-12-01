import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {
  

  constructor(
    private authService: AuthService,
    public router: Router
  ){ }
  canActivate(route: ActivatedRouteSnapshot):boolean{

    const expectedRole = route.data.expectedRole;
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    const data = this.decode(jwt);
    console.log(data);
    
    if (data === expectedRole) {
      if( !this.authService.isAuth()) {
        this.router.navigate(['signin']);
        return false;
      }
      return true;
      }
      else{
        console.log('Usuario no autorizado para esta sección');
        return false;
      }
    }
   
  decode(jwt) {
    try {
      // Get Token Header
      const base64HeaderUrl = jwt.split('.')[0];
      const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
      const headerData = JSON.parse(window.atob(base64Header));
  
      // Get Token payload and date's
      const base64Url = jwt.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const dataJWT = JSON.parse(window.atob(base64));
      dataJWT.header = headerData;
  
  
      return dataJWT;
    } catch (err) {
      return false;
    }
  }
  
  
}