/**
 * 2次元ベクトルクラス
 * ゲーム内の位置、方向、速度などを表現するために使用
 */
export class Vec2 {
  /**
   * @param x X成分
   * @param y Y成分
   */
  constructor(
    public x: number,
    public y: number
  ) {}

  /**
   * ベクトルの加算
   * @param b 足したいベクトル
   * @returns 加算結果の新しいベクトル
   */
  add(b: Vec2): Vec2 {
    return new Vec2(this.x + b.x, this.y + b.y);
  }

  /**
   * ベクトルの減算
   * @param b 引きたいベクトル
   * @returns 減算結果の新しいベクトル
   */
  sub(b: Vec2): Vec2 {
    return new Vec2(this.x - b.x, this.y - b.y);
  }

  /**
   * スカラー倍
   * @param s ベクトルにかけたい実数
   * @returns スカラー倍された新しいベクトル
   */
  mul(s: number): Vec2 {
    return new Vec2(s * this.x, s * this.y);
  }

  /**
   * スカラー除算
   * @param s この実数でベクトルを割る
   * @returns 除算結果の新しいベクトル
   */
  div(s: number): Vec2 {
    return new Vec2(this.x / s, this.y / s);
  }

  /**
   * 内積（ドット積）
   * @param b このベクトルとドット積をとる
   * @returns 内積の値
   */
  dot(b: Vec2): number {
    return this.x * b.x + this.y * b.y;
  }

  /**
   * ベクトルの大きさ（長さ）
   * @returns ベクトルの大きさ（成分のユークリッド距離）
   */
  mag(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  /**
   * 大きさを設定した新しいベクトルを返す
   * @param s 設定したい大きさ
   * @returns 大きさがsのベクトル
   */
  magSet(s: number): Vec2 {
    const currentMag = this.mag();
    return currentMag === 0 ? new Vec2(0, 0) : this.mul(s / currentMag);
  }

  /**
   * 大きさを加算した新しいベクトルを返す
   * @param s 大きさに足したい値
   * @returns 大きさが変更されたベクトル
   */
  magAdded(s: number): Vec2 {
    const currentMag = this.mag();
    return currentMag === 0 ? new Vec2(0, 0) : this.mul(1 + s / currentMag);
  }

  /**
   * ベクトルを回転させる
   * @param rad 回転させたい角度（ラジアン）
   * @returns 回転後の新しいベクトル
   */
  rotated(rad: number): Vec2 {
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return new Vec2(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos
    );
  }

  /**
   * 正規化されたベクトルを返す（大きさが1のベクトル）
   * @returns 正規化されたベクトル
   */
  normalized(): Vec2 {
    const mag = this.mag();
    return mag === 0 ? new Vec2(0, 0) : this.mul(1 / mag);
  }

  /**
   * ベクトルのコピーを作成
   * @returns コピーされた新しいベクトル
   */
  copy(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  /**
   * ベクトルの成分が等しいかを判定
   * @param b 比較対象のベクトル
   * @returns 成分が等しければtrue
   */
  equals(b: Vec2): boolean {
    return this.x === b.x && this.y === b.y;
  }

  /**
   * ゼロベクトルを返す静的メソッド
   * @returns (0, 0) のベクトル
   */
  static zero(): Vec2 {
    return new Vec2(0, 0);
  }

  /**
   * 単位ベクトル（右方向）を返す静的メソッド
   * @returns (1, 0) のベクトル
   */
  static right(): Vec2 {
    return new Vec2(1, 0);
  }

  /**
   * 単位ベクトル（下方向）を返す静的メソッド
   * @returns (0, 1) のベクトル
   */
  static down(): Vec2 {
    return new Vec2(0, 1);
  }
}
