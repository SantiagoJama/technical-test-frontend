import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserLoginCredentialsDTO } from 'src/app/login/dtos/user-login-credentials.dto';
import { Jwt, UserModel } from '../dtos/jwt.dto';
import { Router } from '@angular/router';
import { Api } from 'src/app/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlApi = `${Api}/auth`;

  constructor(private router: Router, private http: HttpClient) {
  }

  public login(login: UserLoginCredentialsDTO): Observable<Jwt> {
    return this.http.post<Jwt>(`${this.urlApi}/login`, login)
      .pipe(
        tap(jwt => this.setToken(jwt))
      );
  }

  public register(register: UserLoginCredentialsDTO): Observable<void> {
    return this.http.post<void>(`${this.urlApi}/register`, register);
  }

  public logOut(): void {
    this.remove();
    this.router.navigateByUrl('/');
  }


  public setToken(jwt: Jwt): void {
    localStorage.setItem("token", jwt.token);
  }

  public remove(): void {
    localStorage.clear();
  }

  public getUser(): UserModel | null {
    const token = this.getToken();
    if (!token) {
      return null
    }
    return JSON.parse(atob(token.split('.')[1])) as UserModel;
  }

  public getToken(): string {
    return localStorage.getItem('token')!;
  }

}
