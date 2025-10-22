import { Injectable, signal } from '@angular/core';
import { Vec2 } from '../models/vec2.model';
import { Player } from '../models/player.model';
import { Level } from '../models/level.model';
import { Drawer } from '../models/drawers/drawer.interface';
import { ShadowDrawer } from '../models/drawers/shadow-drawer';
import { AvatarDrawer } from '../models/drawers/avatar-drawer';
import { RenderUtil } from '../utils/render.util';

/**
 * ゲームサービス
 * ゲームの状態管理、入力処理、物理演算、描画コマンド生成を担当
 */
@Injectable({
  providedIn: 'root'
})
export class GameService {
  /** プレイヤー */
  private player: Player;

  /** レベル（ステージ） */
  private level: Level;

  /** ゲームが初期化されているか */
  private initialized = signal(false);

  constructor() {
    this.player = new Player();
    this.level = Level.createDefault();
  }

  /**
   * ゲームを初期化
   */
  initialize(): void {
    this.player = new Player();
    this.level = Level.createDefault();
    this.initialized.set(true);
  }

  /**
   * 毎フレーム呼ばれる処理（入力・物理演算）
   * @param keyIsPressed キーが押されているか
   * @param keyIsDown キーコードチェック関数
   */
  processFrame(keyIsPressed: boolean, keyIsDown: (code: number) => boolean): void {
    if (!this.initialized()) return;

    const { player, level } = this;

    // キー入力処理
    if (keyIsPressed) {
      // Spaceキーでジャンプ
      if (keyIsDown(32) && player.vz === 0) {
        player.jump(0.1);
      }

      // WASDキーで移動
      let ix = 0;
      let iy = 0;
      if (keyIsDown(68)) ix = 1;   // Dキー（右）
      if (keyIsDown(65)) ix = -1;  // Aキー（左）
      if (keyIsDown(83)) iy = 1;   // Sキー（下）
      if (keyIsDown(87)) iy = -1;  // Wキー（上）

      const inputVec = new Vec2(ix, iy);

      if (!inputVec.equals(Vec2.zero())) {
        // 歩行アニメーションを進める
        player.incrementAnimFrame();

        // 入力から角度を計算（等角図で直感的に移動するためPI/4を引く）
        const angle = Math.atan2(inputVec.y, inputVec.x) - Math.PI / 4;
        player.angle = angle;

        // 移動後の座標を計算
        const futurePos = player.pos.add(
          new Vec2(Math.cos(angle), Math.sin(angle)).mul(1 / 30)
        );

        // 通行可能なら実際に移動
        if (level.isPassable(futurePos.x, futurePos.y, player.height)) {
          player.pos = futurePos;
        }
      }
    }

    // 重力と接地処理
    const futureHeight = player.height + player.vz;
    if (level.isPassable(player.pos.x, player.pos.y, futureHeight)) {
      player.height = futureHeight;
      player.applyGravity(0.0029);
    } else {
      player.resetVelocity();
    }
  }

  /**
   * 描画コマンドを生成
   * @returns 描画コマンドの配列とメタデータ
   */
  generateDrawCommands(): {
    isoDrawers: Drawer[];
    topDrawers: Drawer[];
    playerPos: Vec2;
    level: Level;
  } {
    if (!this.initialized()) {
      return {
        isoDrawers: [],
        topDrawers: [],
        playerPos: Vec2.zero(),
        level: this.level,
      };
    }

    const { player, level } = this;

    // 座標系の定義
    const isoRoot = new Vec2(200, 275);
    const isoXAxis = new Vec2(48, 24);
    const isoYAxis = new Vec2(-48, 24);
    const isoZAxis = Vec2.zero().sub(isoXAxis).sub(isoYAxis);

    const topRoot = new Vec2(400, 50);
    const topXAxis = new Vec2(48, 0);
    const topYAxis = new Vec2(0, 48);

    // プレイヤーの位置計算（等角図）
    const playerLoc = player.pos.copy();
    const playerIsoPos = isoRoot
      .add(isoXAxis.mul(playerLoc.x))
      .add(isoYAxis.mul(playerLoc.y))
      .add(isoZAxis.mul(player.height));
    const playerIsoAngle = player.angle + Math.PI / 4;

    // プレイヤーの位置計算（上面図）
    const playerTopPos = topXAxis
      .mul(playerLoc.x)
      .add(topYAxis.mul(playerLoc.y))
      .add(topRoot);
    const playerTopAngle = player.angle;

    // タイルの描画コマンドを生成
    const isoDrawers = RenderUtil.makeTilemapDrawers(
      level,
      isoRoot,
      isoXAxis,
      isoYAxis,
      4,
      { drawHeight: true }
    );

    const topDrawers = RenderUtil.makeTilemapDrawers(
      level,
      topRoot,
      topXAxis,
      topYAxis,
      4,
      { drawHeight: false }
    );

    // プレイヤーの影と本体の描画コマンドを生成
    const floorHeight = level.heightAt(player.pos.x, player.pos.y);
    const shadowPos = playerIsoPos.sub(isoZAxis.mul(player.height - floorHeight));

    const playerIsoDrawer = new AvatarDrawer(
      playerIsoPos,
      playerIsoAngle,
      player.animFrame,
      Math.floor(player.pos.x) + Math.floor(player.pos.y),
      player.avatarData
    );

    const shadowDrawer = new ShadowDrawer(shadowPos, 8, playerIsoDrawer.depth);

    const playerTopDrawer = new AvatarDrawer(
      playerTopPos.add(new Vec2(0, 12)),
      playerTopAngle,
      player.animFrame,
      0,
      player.avatarData
    );

    // 等角図用の描画コマンドに影とプレイヤーを追加
    const isoDrawOrder = [...isoDrawers, shadowDrawer, playerIsoDrawer];

    // 上面図用の描画コマンドにプレイヤーを追加
    const topDrawOrder = [...topDrawers, playerTopDrawer];

    return {
      isoDrawers: isoDrawOrder,
      topDrawers: topDrawOrder,
      playerPos: player.pos,
      level,
    };
  }

  /**
   * 初期化状態を取得
   */
  isInitialized(): boolean {
    return this.initialized();
  }
}
