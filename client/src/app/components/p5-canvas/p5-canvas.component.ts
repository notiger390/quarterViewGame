import { Component, OnInit, OnDestroy, ElementRef, ChangeDetectionStrategy, inject } from '@angular/core';
import p5 from 'p5';
import { GameService } from '../../services/game.service';
import { RenderUtil } from '../../utils/render.util';
import { Vec2 } from '../../models/vec2.model';

@Component({
  selector: 'app-p5-canvas',
  imports: [],
  templateUrl: './p5-canvas.component.html',
  styleUrl: './p5-canvas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class P5CanvasComponent implements OnInit, OnDestroy {
  private p5Instance: p5 | null = null;
  private gameService = inject(GameService);

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
        p.createCanvas(640, 480);
        // ゲームを初期化
        this.gameService.initialize();
      };

      p.draw = () => {
        // 入力処理と物理演算
        this.gameService.processFrame(p.keyIsPressed, (code: number) => {
          // p5.jsではkeyCodeまたはkeyで判定
          return p.keyIsPressed && p.keyCode === code;
        });

        // 描画コマンドを取得
        const { isoDrawers, topDrawers, level } = this.gameService.generateDrawCommands();

        // 背景をクリア
        p.background(0, 138, 230);

        // 等角図（Isometric view）の描画
        // depth順にソート（奥から手前へ）
        const isoDrawOrder = [...isoDrawers].sort((a, b) => a.depth - b.depth);
        for (const drawer of isoDrawOrder) {
          drawer.draw(p);
        }

        // 上面図（Top view）の描画
        for (const drawer of topDrawers) {
          drawer.draw(p);
        }

        // 上面図にタイルの高さを表示
        const topRoot = new Vec2(400, 50);
        const topXAxis = new Vec2(48, 0);
        const topYAxis = new Vec2(0, 48);
        RenderUtil.drawTileHeights(p, level, topRoot, topXAxis, topYAxis, 4);

        // 操作説明を表示
        p.push();
        p.textAlign(p.LEFT, p.TOP);
        p.textSize(24);
        p.noStroke();
        p.fill('white');
        p.text('W,S,A,Dキーで移動、Spaceキーでジャンプ', 0, 0);
        p.pop();
      };
    };

    this.p5Instance = new p5(sketch, this.elementRef.nativeElement);
  }
}
