import { Component } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent {
  slides = [
    { title: 'Slide 1', description: 'Descripción del slide 1' },
    { title: 'Slide 2', description: 'Descripción del slide 2' },
    { title: 'Slide 3', description: 'Descripción del slide 3' }
  ];
}
