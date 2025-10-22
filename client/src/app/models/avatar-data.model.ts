/**
 * アバターの目のタイプ
 */
export type EyeType = 'circle' | 'dot' | 'custom';

/**
 * アバターの目の位置情報
 */
export interface EyePosition {
  x: number;
  y: number;
}

/**
 * アバターの目の設定
 */
export interface AvatarEyes {
  type: EyeType;
  color: string;
  size?: number;
  positions: EyePosition[];
}

/**
 * アバターのアクセサリー情報
 */
export interface AvatarAccessory {
  type: string;
  position: { x: number; y: number };
  data: unknown;
}

/**
 * アバターのアニメーション設定
 */
export interface AvatarAnimation {
  walkBounce: boolean;
  bounceAmount: number;
}

/**
 * アバターデータのインターフェース
 * エディタで作成・編集されるアバターの見た目情報
 */
export interface AvatarData {
  // 基本情報
  id: string;
  name: string;

  // 体のパーツ
  body: {
    color: string;
    size: number;
  };

  // 頭のパーツ
  head: {
    color: string;
    size: number;
    offset: { x: number; y: number };
  };

  // 目のパーツ（オプション）
  eyes?: AvatarEyes;

  // くちばし/口（オプション）
  beak?: {
    color: string;
    size: number;
    offset: { x: number; y: number };
  };

  // アクセサリー（オプション）
  accessories?: AvatarAccessory[];

  // アニメーション設定（オプション）
  animation?: AvatarAnimation;
}

/**
 * デフォルトアバターデータを生成するファクトリー関数
 */
export function createDefaultAvatar(): AvatarData {
  return {
    id: 'default',
    name: 'デフォルトキャラクター',
    body: {
      color: '#FFE5B4',  // ピーチ系のベージュ（肌色）
      size: 32,
    },
    head: {
      color: '#FFE5B4',  // 肌色
      size: 24,
      offset: { x: 6, y: -16 },
    },
    eyes: {
      type: 'dot',
      color: '#2C3E50',  // 落ち着いたダークグレー
      size: 3,
      positions: [
        { x: 8, y: -4 },
        { x: -8, y: -4 },
      ],
    },
    beak: {
      color: '#FF9A8B',  // 柔らかいコーラルピンク（口）
      size: 8,
      offset: { x: 12, y: 0 },
    },
    animation: {
      walkBounce: true,
      bounceAmount: 2,
    },
  };
}

/**
 * シンプルなアバターデータを生成するファクトリー関数
 */
export function createSimpleAvatar(color: string = 'lightblue'): AvatarData {
  return {
    id: 'simple',
    name: 'シンプルキャラクター',
    body: {
      color,
      size: 28,
    },
    head: {
      color,
      size: 20,
      offset: { x: 0, y: -14 },
    },
    eyes: {
      type: 'circle',
      color: 'white',
      size: 6,
      positions: [
        { x: 5, y: -3 },
        { x: -5, y: -3 },
      ],
    },
    animation: {
      walkBounce: true,
      bounceAmount: 1.5,
    },
  };
}
