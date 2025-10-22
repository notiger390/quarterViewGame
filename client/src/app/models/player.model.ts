import { Vec2 } from './vec2.model';
import { AvatarData, createDefaultAvatar } from './avatar-data.model';

/**
 * プレイヤークラス
 * プレイヤーの位置、角度、高さ、速度、アバター情報を管理
 */
export class Player {
  /** プレイヤーの位置（タイル座標） */
  pos: Vec2;

  /** プレイヤーの向き（ラジアン） */
  angle: number;

  /** プレイヤーの高さ（Z座標） */
  height: number;

  /** Z軸方向の速度（ジャンプ・落下） */
  vz: number;

  /** アニメーションフレーム */
  animFrame: number;

  /** プレイヤーのアバターデータ */
  avatarData: AvatarData;

  /**
   * @param avatarData アバターデータ（省略時はデフォルト）
   * @param initialPos 初期位置（省略時は (1.5, 3.5)）
   */
  constructor(
    avatarData?: AvatarData,
    initialPos: Vec2 = new Vec2(1.5, 3.5)
  ) {
    this.pos = initialPos.copy();
    this.angle = -Math.PI / 2;
    this.height = 1;
    this.vz = 0;
    this.animFrame = 0;
    this.avatarData = avatarData ?? createDefaultAvatar();
  }

  /**
   * アニメーションフレームを進める
   */
  incrementAnimFrame(): void {
    this.animFrame++;
  }

  /**
   * ジャンプを開始
   * @param initialVelocity 初速度（デフォルト: 0.1）
   */
  jump(initialVelocity: number = 0.1): void {
    if (this.vz === 0) {
      this.vz = initialVelocity;
    }
  }

  /**
   * 重力を適用
   * @param gravity 重力加速度（デフォルト: 0.0029）
   */
  applyGravity(gravity: number = 0.0029): void {
    this.vz -= gravity;
  }

  /**
   * Z軸方向の速度を適用して高さを更新
   */
  updateHeight(): void {
    this.height += this.vz;
  }

  /**
   * Z軸方向の速度をリセット
   */
  resetVelocity(): void {
    this.vz = 0;
  }
}
