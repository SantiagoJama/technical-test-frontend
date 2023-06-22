import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/enviroment/enviroment';
import { UserLoginCredentialsDTO } from 'src/app/login/dtos/user-login-credentials.dto';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private urlApi : string = `${Api}/`;



  constructor( private readonly http : HttpClient ) { }



  public saveNewUser( userCredentiales : UserLoginCredentialsDTO ) : Observable<any> {
    
    return this.http.post<any>(`${this.urlApi}auth/register`, userCredentiales);  

  } 
}
