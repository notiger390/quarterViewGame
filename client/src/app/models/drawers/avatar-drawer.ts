import { Vec2 } from '../vec2.model';
import { AvatarData } from '../avatar-data.model';
import { Drawer } from './drawer.interface';

/**
 * カスタムアバターを描画するクラス
 * AvatarDataに基づいてキャラクターを描画
 */
export class AvatarDrawer implements Drawer {
  /**
   * @param pos 足元の位置ベクトル
   * @param angle Z軸の角度（ラジアン）
   * @param animFrame アニメーションの何フレーム目を再生するか
   * @param depth 描画の深度
   * @param avatarData アバターの見た目データ
   */
  constructor(
    private pos: Vec2,
    private angle: number,
    private animFrame: number,
    public depth: number,
    private avatarData: AvatarData
  ) {}

  /**
   * アバターを描画
   * @param p5 p5.jsのインスタンス
   */
  draw(p5: any): void {
    const { pos, angle, animFrame, avatarData } = this;

    // 角度を0～2πに正規化する（誤差によるバグを避けるため0.0001を加算）
    const normalized = (a: number) => (a + 0.0001 + 10000 * Math.PI) % (2 * Math.PI);

    // こちらを向いているかを判定（広い範囲）
    const isFacingUs = (a: number): boolean => {
      a = normalized(a);
      return a >= -Math.PI / 36 && a <= (37 * Math.PI) / 36;
    };

    // こちらを向いているかを判定（狭い範囲）
    const isFacingUsNarrow = (a: number): boolean => {
      a = normalized(a);
      return a >= Math.PI / 12 && a <= (11 * Math.PI) / 12;
    };

    const normalizedAngle = normalized(angle);

    // アニメーション設定の取得（デフォルト値あり）
    const walkBounce = avatarData.animation?.walkBounce ?? true;
    const bounceAmount = avatarData.animation?.bounceAmount ?? 2;

    // 歩行アニメーション：上下に揺れる
    const shake = walkBounce && animFrame % 20 > 10
      ? new Vec2(0, -bounceAmount)
      : Vec2.zero();

    // 体の中心位置
    const bodyCenter = pos.add(new Vec2(0, -16)).add(shake);

    // 頭の中心位置
    const headOffset = avatarData.head.offset;
    const headCenter = bodyCenter
      .add(new Vec2(headOffset.x * Math.cos(angle), headOffset.y))
      .sub(shake);

    // くちばし/口の中心位置（オプション）
    let beakCenter: Vec2 | null = null;
    if (avatarData.beak && isFacingUs(angle)) {
      const beakOffset = avatarData.beak.offset;
      beakCenter = headCenter.add(new Vec2(beakOffset.x * Math.cos(angle), beakOffset.y));
    }

    // 目の位置を計算（オプション）
    const eyes: Vec2[] = [];
    if (avatarData.eyes) {
      for (const eyePos of avatarData.eyes.positions) {
        const eyeAngle = angle + (eyePos.x > 0 ? -Math.PI / 3 : Math.PI / 3);
        if (isFacingUs(eyeAngle)) {
          eyes.push(headCenter.add(new Vec2(
            Math.abs(eyePos.x) * Math.cos(eyeAngle),
            eyePos.y
          )));
        }
      }
    }

    p5.push();
    p5.stroke('black');
    p5.strokeWeight(2);

    // 体と頭の描画順序を向きによって変える
    const drawBody = () => {
      p5.fill(avatarData.body.color);
      p5.circle(bodyCenter.x, bodyCenter.y, avatarData.body.size);
    };

    const drawHead = () => {
      p5.fill(avatarData.head.color);
      p5.circle(headCenter.x, headCenter.y, avatarData.head.size);
    };

    if (isFacingUs(angle)) {
      drawBody();
      drawHead();
    } else {
      drawHead();
      drawBody();
    }

    // 目を描画
    if (avatarData.eyes && eyes.length > 0) {
      p5.fill(avatarData.eyes.color);
      p5.strokeWeight(0);
      for (const eye of eyes) {
        const eyeSize = avatarData.eyes.size ?? 3;
        if (avatarData.eyes.type === 'circle') {
          p5.circle(eye.x, eye.y, eyeSize);
        } else {
          // dot or custom
          p5.circle(eye.x, eye.y, eyeSize);
        }
      }
    }

    // くちばし/口を描画（オプション）
    if (avatarData.beak && beakCenter !== null) {
      p5.fill(avatarData.beak.color);
      p5.strokeWeight(1);
      p5.circle(beakCenter.x, beakCenter.y, avatarData.beak.size);
    }

    p5.pop();
  }
}
