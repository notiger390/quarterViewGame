import { Component } from '@angular/core';
import { P5CanvasComponent } from './components/p5-canvas/p5-canvas.component';

@Component({
  selector: 'app-root',
  imports: [P5CanvasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
