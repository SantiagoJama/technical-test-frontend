import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {tap} from 'rxjs';
import { LoginService } from './services/login.service';
import { UserLoginCredentialsDTO } from './dtos/user-login-credentials.dto';
import { LoginResponseDTO } from './dtos/login.dto';
import { Router } from '@angular/router';
import { LocalStorageService } from '../global-services/local-storage-service/local-storage.service';
import Swal from 'sweetalert2';
import { UserLoggedDTO } from '../global-services/dtos/local-storage.dtos';
import { AuthService } from '../global-services/auth-service/auth.service';
import { Jwt } from '../global-services/dtos/jwt.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  // public username! : string;

  //for dependency injections
  constructor( private readonly loginService : LoginService,
               private readonly router : Router,
               private readonly localStorageService : LocalStorageService,
               private readonly authService : AuthService
               ){}



  ngOnInit() {
 
    if( this.router.url === "/sign-in" || this.router.url ==="/") this.authService.remove();

    
  }




  /**
   * 
   */
  onSubmit( loginFromValues : NgForm){
      console.log( loginFromValues.value.username);
      const userCredentials : UserLoginCredentialsDTO = {
        username : loginFromValues.value.username,
        password : loginFromValues.value.userpass
      }
      console.log("BODY REQUEST SENT ");
      console.log( userCredentials );
      this.loginService.loginAccess( userCredentials )
      .pipe(
        tap((sucessfulResponse) => this.authService.setToken( sucessfulResponse ))
      )
          .subscribe({
            next : ( sucessfulResponse : Jwt  )=>{
                console.log( sucessfulResponse )
                if( sucessfulResponse.token ){
                  console.log("ingresamos")
                  const userName : UserLoggedDTO = {
                    name : loginFromValues.value.username
                  }
                
                  this.localStorageService.setUserNameLogged( userName )
                  
                  this.router.navigate(["/home"]);
                }else{
                    Swal.fire({
                      title: 'Error en las credenciales',
                      text : 'Por favor, revise sus credenciales y vuelva a intentar',
                      icon : 'error',
                      confirmButtonText: 'Ok',
                      confirmButtonColor : '#3F8CE3',
                    }).then((result) => { 
                    
                      if ( result.isConfirmed  || result.isDismissed ) {
                          loginFromValues.resetForm();
                      } 
                    })
                }
            },
            error : ( errorResponse )=>{
                console.log( errorResponse );
                Swal.fire({
                  title: 'Error en las credenciales',
                  text : 'Ocurrió un error, las credenciales no son validas',
                  icon : 'error',
                  confirmButtonText: 'Ok',
                  confirmButtonColor : '#3F8CE3',
                })
            },
            complete : ()=>{
              console.log( "End server comunication" )
            }
          })
      
  }

  
  

}
