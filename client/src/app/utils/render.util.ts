import { Vec2 } from '../models/vec2.model';
import { Level } from '../models/level.model';
import { Drawer } from '../models/drawers/drawer.interface';
import { QuadDrawer } from '../models/drawers/quad-drawer';

/**
 * 描画ユーティリティクラス
 * タイル座標の計算や描画コマンドの生成を行う
 */
export class RenderUtil {
  /**
   * タイルの4頂点を計算して返す
   * @param x タイルのX座標
   * @param y タイルのY座標
   * @param z タイルの高さ（Z座標）
   * @param root 原点の位置ベクトル（スクリーン座標系）
   * @param xAxis X軸の方向ベクトル
   * @param yAxis Y軸の方向ベクトル
   * @returns タイルの4頂点を、原点から時計回りに返す
   */
  static tileVertexes(
    x: number,
    y: number,
    z: number,
    root: Vec2,
    xAxis: Vec2,
    yAxis: Vec2
  ): Vec2[] {
    const vx = x - z;
    const vy = y - z;
    const p = root.add(xAxis.mul(vx)).add(yAxis.mul(vy));

    return [
      p,
      p.add(xAxis),
      p.add(xAxis).add(yAxis),
      p.add(yAxis),
    ];
  }

  /**
   * タイルマップ全体の描画コマンドを生成
   * @param level レベルデータ
   * @param root 原点の位置ベクトル（スクリーン座標系）
   * @param xAxis X軸の方向ベクトル
   * @param yAxis Y軸の方向ベクトル
   * @param viewSize 描画する範囲（例: 3なら3x3タイル描画）
   * @param options オプション設定
   * @returns 生成された描画コマンドの配列
   */
  static makeTilemapDrawers(
    level: Level,
    root: Vec2,
    xAxis: Vec2,
    yAxis: Vec2,
    viewSize: number,
    options: { drawHeight: boolean } = { drawHeight: true }
  ): Drawer[] {
    const zAxis = Vec2.zero().sub(xAxis).sub(yAxis);
    const drawers: Drawer[] = [];

    for (let ty = 0; ty < viewSize; ty++) {
      for (let tx = 0; tx < viewSize; tx++) {
        // 床の描画コマンドを生成
        const height = options.drawHeight ? level.heightAt(tx, ty) : 0;

        // タイルの上面の4頂点
        const topVertexes = this.tileVertexes(tx, ty, height, root, xAxis, yAxis);
        const depth = tx + ty;

        // 上面を描画 - モダンなミントグリーン
        drawers.push(new QuadDrawer(topVertexes, '#A8D5BA', depth));

        // 高さのあるタイルなら、壁の描画コマンドを生成
        if (height > 0) {
          const wallVec = zAxis.mul(height);
          // タイルの底面の4頂点
          const bottomVertexes = topVertexes.map(v => v.sub(wallVec));

          // X軸側の壁面 - 少し暗めのミントグリーン
          drawers.push(
            new QuadDrawer(
              [topVertexes[1], bottomVertexes[1], bottomVertexes[2], topVertexes[2]],
              '#8BB9A0',
              depth
            )
          );

          // Y軸側の壁面 - 少し暗めのミントグリーン
          drawers.push(
            new QuadDrawer(
              [topVertexes[2], bottomVertexes[2], bottomVertexes[3], topVertexes[3]],
              '#8BB9A0',
              depth
            )
          );
        }
      }
    }

    return drawers;
  }

  /**
   * タイルの高さを数値で描画するヘルパー関数
   * @param p5 p5.jsインスタンス
   * @param level レベルデータ
   * @param root 原点の位置ベクトル
   * @param xAxis X軸の方向ベクトル
   * @param yAxis Y軸の方向ベクトル
   * @param length 描画する範囲
   */
  static drawTileHeights(
    p5: any,
    level: Level,
    root: Vec2,
    xAxis: Vec2,
    yAxis: Vec2,
    length: number
  ): void {
    p5.push();
    p5.stroke('black');
    p5.strokeWeight(2);
    p5.fill('white');
    p5.textAlign(p5.LEFT, p5.TOP);
    p5.textSize(24);

    for (let ty = 0; ty < length; ty++) {
      for (let tx = 0; tx < length; tx++) {
        const tvs = this.tileVertexes(tx, ty, 0, root, xAxis, yAxis);
        const height = level.heightAt(tx, ty);
        p5.text(`${height}`, tvs[0].x, tvs[0].y);
      }
    }

    p5.pop();
  }

  /**
   * 矢印を描画するヘルパー関数（デバッグ用）
   * @param p5 p5.jsインスタンス
   * @param begin 始点の位置ベクトル
   * @param way 矢印の方向ベクトル
   * @param brimSize 矢印の先端のサイズ
   */
  static drawArrow(
    p5: any,
    begin: Vec2,
    way: Vec2,
    brimSize: number = 20
  ): void {
    const end = begin.add(way);

    if (brimSize !== 0) {
      const b1 = way.normalized().mul(-brimSize).rotated(Math.PI / 6);
      const b2 = b1.rotated((-2 * Math.PI) / 6);

      [b1, b2].forEach(brim => {
        const brimEnd = end.add(brim);
        p5.line(end.x, end.y, brimEnd.x, brimEnd.y);
      });
    }

    p5.line(begin.x, begin.y, end.x, end.y);
  }
}
