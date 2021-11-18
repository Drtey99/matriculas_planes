import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DarkModeComponent } from './header/dark-mode/dark-mode.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { DatosAlumnoComponent } from './matricula/datos-alumno/datos-alumno.component';
import { DatosFamiliaresComponent } from './matricula/datos-familiares/datos-familiares.component';
import { DatosAcademicosComponent } from './matricula/datos-academicos/datos-academicos.component';
import { AutorizacionImagenComponent } from './matricula/autorizacion-imagen/autorizacion-imagen.component';
import { EnfermedadesComponent } from './matricula/enfermedades/enfermedades.component';
import { AutorizacionDatosPersonalesComponent } from './matricula/autorizacion-datos-personales/autorizacion-datos-personales.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

import { JwtHelperService, JWT_OPTIONS }  from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';

/* import { RoleGuard } from './guard/role.guard';
import { AuthGuard } from './guard/auth.guard'; */

const rutas = [ 
  { path: 'main', component: MainComponent/* , canActivate:[RoleGuard, AuthGuard], data: { expectedRole: 'admin' } */},
  { path: 'user', component: UserComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
    
  ];

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    FooterComponent,
    DarkModeComponent,
    MatriculaComponent,
    DatosAlumnoComponent,
    DatosFamiliaresComponent,
    DatosAcademicosComponent,
    AutorizacionImagenComponent,
    EnfermedadesComponent,
    AutorizacionDatosPersonalesComponent,
    MainComponent,
    UserComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(rutas),
    AppRoutingModule
  ],
  providers: [
     // JWT
     { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
     JwtHelperService,
     // Token interceptor
     { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
