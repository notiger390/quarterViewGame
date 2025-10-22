/**
 * ゲームステージ（レベル）クラス
 * タイルマップのデータと通行可能判定を管理
 */
export class Level {
  /** タイルの高さ情報（1次元配列） */
  heights: number[];

  /** タイルのX方向の長さ */
  tileXLen: number;

  /** タイルのY方向の長さ */
  tileYLen: number;

  constructor() {
    this.heights = [];
    this.tileXLen = 0;
    this.tileYLen = 0;
  }

  /**
   * (x, y) 座標を1次元配列のインデックスに変換
   * @param x X座標
   * @param y Y座標
   * @returns 配列のインデックス（範囲外の場合は -1）
   */
  asIndex(x: number, y: number): number {
    const xi = Math.floor(x);
    const yi = Math.floor(y);

    if (xi < 0 || xi >= this.tileXLen) return -1;
    if (yi < 0 || yi >= this.tileYLen) return -1;

    return yi * this.tileXLen + xi;
  }

  /**
   * 指定座標のタイルの高さを取得
   * @param x X座標
   * @param y Y座標
   * @returns タイルの高さ（範囲外の場合は 0）
   */
  heightAt(x: number, y: number): number {
    const index = this.asIndex(x, y);
    return index === -1 ? 0 : this.heights[index];
  }

  /**
   * 指定座標が通行可能かを判定
   * @param x X座標
   * @param y Y座標
   * @param z Z座標（高さ）
   * @returns 通行可能であれば true
   */
  isPassable(x: number, y: number, z: number): boolean {
    const tileHeight = this.heightAt(x, y);
    // タイルの高さが0でなく、かつプレイヤーの高さがタイルの高さ以上なら通行可能
    return tileHeight !== 0 && z >= tileHeight;
  }

  /**
   * デフォルトのレベルデータを生成
   * @returns デフォルトレベル
   */
  static createDefault(): Level {
    const level = new Level();
    // 8x8のマップに拡張
    // 一旦フラットにして評価しやすくする
    level.heights = [
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    ];
    level.tileXLen = 8;
    level.tileYLen = 8;
    return level;
  }

  /**
   * フラットなレベルデータを生成（テスト用）
   * @param width 横幅
   * @param height 縦幅
   * @param flatHeight すべてのタイルの高さ
   * @returns フラットレベル
   */
  static createFlat(width: number = 5, height: number = 5, flatHeight: number = 1): Level {
    const level = new Level();
    level.tileXLen = width;
    level.tileYLen = height;
    level.heights = new Array(width * height).fill(flatHeight);
    return level;
  }
}
