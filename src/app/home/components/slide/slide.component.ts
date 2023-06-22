import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  public slides: any[] = [];

  constructor( private readonly homeServie : HomeService){

  }

  ngOnInit( ): void {
    this.homeServie.getSlidesInformation()
      .subscribe({
        next : ( response : any )=>{
          console.log( response)
          this.slides = response;
        },  
        error : ( e )=>{
          console.log(e )
        }
      })
  }
  
}
