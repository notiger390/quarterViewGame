import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-p5-canvas',
  imports: [],
  templateUrl: './p5-canvas.component.html',
  styleUrl: './p5-canvas.component.scss'
})
export class P5CanvasComponent implements OnInit, OnDestroy {
  private p5Instance: p5 | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.createCanvas();
  }

  ngOnDestroy(): void {
    if (this.p5Instance) {
      this.p5Instance.remove();
    }
  }

  private createCanvas(): void {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(800, 600);
        p.background(220);
      };

      p.draw = () => {
        p.background(220);
        p.fill(255, 0, 0);
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
      };
    };

    this.p5Instance = new p5(sketch, this.elementRef.nativeElement);
  }
}
