import { Vec2 } from '../vec2.model';
import { Drawer } from './drawer.interface';

/**
 * 四角形（矩形）を描画するクラス
 * タイルの表面や壁面の描画に使用
 */
export class QuadDrawer implements Drawer {
  /**
   * @param vertexes 四角形の4つの頂点（時計回り）
   * @param color 塗りつぶしの色
   * @param depth 描画の深度
   */
  constructor(
    private vertexes: Vec2[],
    private color: string,
    public depth: number
  ) {
    if (vertexes.length !== 4) {
      console.error('QuadDrawer requires exactly 4 vertexes');
    }
  }

  /**
   * 四角形を描画
   * @param p5 p5.jsのインスタンス
   */
  draw(p5: any): void {
    const vs = this.vertexes;

    p5.push();
    p5.stroke('black');
    p5.strokeWeight(2);
    p5.fill(this.color);
    p5.quad(
      vs[0].x, vs[0].y,
      vs[1].x, vs[1].y,
      vs[2].x, vs[2].y,
      vs[3].x, vs[3].y
    );
    p5.pop();
  }
}
