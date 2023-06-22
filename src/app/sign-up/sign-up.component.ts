import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignUpService } from './services/sign-up.service';
import { UserLoginCredentialsDTO } from '../login/dtos/user-login-credentials.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor( private readonly signUpService : SignUpService){

  }

  onSubmit(  userRegisterData : NgForm) : void{
        console.log( userRegisterData )

        const userData : UserLoginCredentialsDTO ={
           username : userRegisterData.value.username,
           password : userRegisterData.value.userpass,
           passwordconfi : userRegisterData.value.userpassconf
        }
        console.log(userData);
      this.signUpService.saveNewUser( userData )
      .subscribe({
        next : ( response : any) =>{
          console.log( response )
          if( response == null ){
            Swal.fire({
              title: 'Usuario creado',
              text : `El usuario creado con éxito`,
              icon : 'success',
              confirmButtonText: 'Ok',
              confirmButtonColor : '#3F8CE3',
            })
            userRegisterData.resetForm();
          }
        },
        error : ( e )=>{
          console.log( e )
          Swal.fire({
            title: 'Error en las credenciales',
            text : `${e['error']['message']}`,
            icon : 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor : '#3F8CE3',
          })
        }
      })
      

      
  }
}
