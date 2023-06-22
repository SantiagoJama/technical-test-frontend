import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private urlApi : string = `${Api}/`;



  constructor( private readonly http : HttpClient ) { }



  public getSlidesInformation() : Observable<any> {
    return this.http.get<any>(`${this.urlApi}slide`);  
  } 
}
