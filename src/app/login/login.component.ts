import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './services/login.service';
import { UserLoginCredentialsDTO } from './dtos/user-login-credentials.dto';
import { LoginResponseDTO } from './dtos/login.dto';
import { Router } from '@angular/router';
import { LocalStorageService } from '../global-services/local-storage-service/local-storage.service';
import Swal from 'sweetalert2';
import { UserLoggedDTO } from '../global-services/dtos/local-storage.dtos';

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
               private readonly localStorageService : LocalStorageService){}



  ngOnInit() {
   
  }




  /**
   * 
   */
  onSubmit( loginFromValues : NgForm){
      // console.log( loginFromValues );
      console.log( loginFromValues.value.username);
      const userCredentials : UserLoginCredentialsDTO = {
        userName : loginFromValues.value.username,
        userPassword : loginFromValues.value.userpass
      }
      console.log("BODY REQUEST SENT ");
      console.log( userCredentials );
      this.loginService.loginAccess( userCredentials )
          .subscribe({
            next : ( sucessfulResponse : LoginResponseDTO )=>{
                console.log( sucessfulResponse )
                if( sucessfulResponse.code === '200'){
                  const userName : UserLoggedDTO = {
                    name : loginFromValues.value.username
                  }
                  this.localStorageService.setUserNameLogged( userName )
                  this.router.navigate(["/home"])
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
                  title: 'Error en el servicio',
                  text : 'Ocurrió un error inesperado en el servicio, por favor vuelva a intentarlo',
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
