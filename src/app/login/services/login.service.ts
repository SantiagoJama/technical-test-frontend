import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponseDTO } from '../dtos/login.dto';
import { Observable, of } from 'rxjs';
import { UserLoginCredentialsDTO } from '../dtos/user-login-credentials.dto';
import { Api } from 'src/app/enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  private urlApi : string = `${Api}/`;



  constructor( private readonly http : HttpClient ) { }



  public loginAccess( userCredentiales : UserLoginCredentialsDTO ) : Observable<LoginResponseDTO> {
    
    return this.http.post<LoginResponseDTO>(`${this.urlApi}auth/login`, userCredentiales);  

  } 


}
