import { Injectable } from '@angular/core';
import { UserLoggedDTO } from '../dtos/local-storage.dtos';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly USER_LOGGED_NAME : string = "USER_NAME_USER";
  
  constructor() { }


  /**
   * Este servicio permite almacenar el nombre del usuario que ingresa mediante el login
   * @param userLogged 
   */
    public setUserNameLogged( userLogged : UserLoggedDTO ) : void {
      localStorage.setItem(this.USER_LOGGED_NAME, JSON.stringify(userLogged));
    }


  /**
   * Este servicio permite obtener el nombre del usuario que ingresó mediante el login
   * @returns UserLoggedDTO -> Objeto, con el nombre del usuario
   */
    public getUserNameLogged() : UserLoggedDTO {
      const userLoogedData : any = localStorage.getItem(this.USER_LOGGED_NAME);
      return <UserLoggedDTO> JSON.parse(userLoogedData );
    }

   


}
