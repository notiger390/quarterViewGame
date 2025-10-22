import { Vec2 } from '../vec2.model';
import { Drawer } from './drawer.interface';

/**
 * キャラクターの影を描画するクラス
 */
export class ShadowDrawer implements Drawer {
  /**
   * @param pos 影の中心位置
   * @param radius 影の半径
   * @param depth 描画の深度
   */
  constructor(
    private pos: Vec2,
    private radius: number,
    public depth: number
  ) {}

  /**
   * 楕円形の影を描画
   * @param p5 p5.jsのインスタンス
   */
  draw(p5: any): void {
    p5.push();
    p5.strokeWeight(0);
    p5.fill('black');
    // 楕円の影（横幅は縦幅の2倍）
    p5.ellipse(this.pos.x, this.pos.y, this.radius * 4, this.radius * 2);
    p5.pop();
  }
}
