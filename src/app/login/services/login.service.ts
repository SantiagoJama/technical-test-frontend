import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponseDTO } from '../dtos/login.dto';
import { Observable, of } from 'rxjs';
import { UserLoginCredentialsDTO } from '../dtos/user-login-credentials.dto';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /*============== MOCK ============= */
  private successfulResponse: LoginResponseDTO ={
    code : "200",
    status : "OK",
    response : {
      message : "Credenciales correctas",
      userName : "Santiago"
    }
  };

  private failedResponse : LoginResponseDTO ={
    code : "-2",
    status : "Not OK",
    response : {
      message : "Credenciales incorrectas",
      userName : ""
    }
  };
  /*================================= */


  constructor( private readonly http : HttpClient ) { }

  public loginAccess( userCredentiales : UserLoginCredentialsDTO ) : Observable<LoginResponseDTO> {

    if( userCredentiales.userName =="santiago" && userCredentiales.userPassword == "123"){
      return of (
        this.successfulResponse
      )
    }else{
      return of(
        this.failedResponse
      )
    }

  } 

}
