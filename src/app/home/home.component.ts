import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../global-services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userName! : string;

  constructor( private readonly localStorageService : LocalStorageService){

  }

  ngOnInit(): void {

    this.userName = this.localStorageService.getUserNameLogged().name;
    
  }
  


}
