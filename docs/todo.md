# quarterViewGame - TODO リスト

このドキュメントはプロジェクトのタスク管理と開発の進捗を記録します。

## 現在の開発フェーズ: Phase 1 - お部屋機能の基盤実装

### 実装計画概要

`sample/quarter-view-sample.js` のp5.jsサンプルコードを参考に、Angular + TypeScript でクォータービューのお部屋機能を実装します。

#### 設計方針
- **型安全**: TypeScriptの型システムを最大限活用
- **Angular Signals**: ゲーム状態の管理にSignalsを使用
- **拡張性**: 将来のアバターエディタ機能を見据えた設計
- **再利用性**: コンポーネント・サービス・モデルの明確な分離

---

## Phase 1: 基盤実装 ✅ 完了

### ✅ 完了タスク
- [x] プロジェクトのセットアップ（Angular 19 + p5.js + PrimeNG）
- [x] サンプルコードの分析と設計方針の決定
- [x] ドキュメント構造の整備（docs/todo.md、CLAUDE.md、README.md）
- [x] Vec2クラスの実装
- [x] Player、Level、AvatarDataモデルの実装
- [x] Drawer系クラスの実装（QuadDrawer、ShadowDrawer、AvatarDrawer）
- [x] RenderUtilクラスの実装
- [x] GameServiceの実装
- [x] p5-canvasコンポーネントへのゲームロジック統合
- [x] 動作確認とデバッグ
- [x] キー入力対応（WASD移動、Spaceジャンプ）
- [x] レスポンシブ対応（ウィンドウサイズに応じたキャンバスサイズ）
- [x] マップの中央配置（クォータービュー対応の正確な計算）
- [x] 8x8フィールドへの拡張

### 🔄 過去の進行中タスク（完了済み）

#### 1. モデル層の実装 (`client/src/app/models/`)
- [ ] **Vec2 クラス** (`vec2.model.ts`)
  - 2次元ベクトルの演算クラス
  - 加算、減算、乗算、除算、内積、回転、正規化など
  - サンプルコードの `Vec2` クラスをTypeScriptで型安全に実装

- [ ] **Player モデル** (`player.model.ts`)
  - プレイヤーの状態管理
  - プロパティ: `pos`, `angle`, `height`, `vz`, `animFrame`, `avatarData`
  - アバターデータを保持する設計

- [ ] **Level モデル** (`level.model.ts`)
  - タイルマップのデータ管理
  - 高さ情報の保持 (`heights[]`)
  - 通行可能判定ロジック (`isPassable()`)

- [ ] **AvatarData モデル** (`avatar-data.model.ts`)
  - アバターの見た目データを定義するインターフェース
  - 体、頭、目、アクセサリーなどのパーツ情報
  - 将来のエディタ機能で編集されるデータ構造

#### 2. Drawer層の実装 (`client/src/app/models/drawers/`)
- [ ] **Drawer インターフェース** (`drawer.interface.ts`)
  - すべての描画クラスの共通インターフェース
  - `draw(p5Instance: any): void` メソッド
  - `depth: number` プロパティ（描画順序制御用）

- [ ] **QuadDrawer** (`quad-drawer.ts`)
  - 四角形（矩形）の描画
  - タイルの表面・壁面の描画に使用

- [ ] **ShadowDrawer** (`shadow-drawer.ts`)
  - キャラクターの影の描画
  - 楕円形の影

- [ ] **AvatarDrawer** (`avatar-drawer.ts`)
  - カスタムアバターの描画
  - `AvatarData` に基づいて描画
  - 角度による向きの変更
  - アニメーションフレームによる動きの表現
  - ※ `ChickenDrawer` の代わりとなる汎用的なクラス

#### 3. ユーティリティとサービス
- [ ] **Render Util** (`client/src/app/utils/render.util.ts`)
  - タイル座標の計算
  - 描画コマンドの生成
  - `tileVertexes()`: タイルの4頂点を計算
  - `makeTilemapDrawers()`: タイルマップ全体の描画コマンドを生成

- [ ] **GameService** (`client/src/app/services/game.service.ts`)
  - ゲームのメインロジック
  - 入力処理（WASD移動、Spaceジャンプ）
  - 物理演算（重力、衝突判定）
  - 描画コマンドの生成
  - Angular Signalsで状態管理
  - `providedIn: 'root'` でシングルトン化

#### 4. コンポーネント統合
- [ ] **p5-canvas コンポーネント更新**
  - `GameService` をインジェクト
  - p5.js の `setup()` と `draw()` をゲームロジックと統合
  - キーボード入力イベントの処理
  - 既存の実装を拡張

#### 5. テストと動作確認
- [ ] 基本動作の確認
  - キャラクターがWASDキーで移動できる
  - Spaceキーでジャンプできる
  - タイルの高さに応じた衝突判定が機能する
  - 等角図（Isometric view）が正しく描画される

- [ ] デバッグとブラッシュアップ
  - パフォーマンスチェック
  - 描画順序の確認（depth-based rendering）
  - エッジケースのテスト

---

## Phase 2: アバターエディタ機能 (次フェーズ)

### 🔮 予定タスク
- [ ] アバターエディタUIコンポーネントの作成
  - パーツ選択インターフェース
  - カラーピッカー
  - リアルタイムプレビュー

- [ ] アバターデータの保存・読み込み
  - LocalStorage への保存
  - JSON エクスポート/インポート

- [ ] プリセットアバターの作成
  - デフォルトアバター数種類
  - プリセットギャラリー

---

## Phase 3: 拡張機能 (将来)

### 🌟 アイデア
- [ ] 複数の部屋（ルーム）の実装
- [ ] NPCキャラクターの追加
- [ ] アイテムシステム
- [ ] マルチプレイヤー対応の検討

---

## 技術的な課題・メモ

### 座標系について
- **等角図（Isometric）**: メインビュー。斜め上から見下ろす視点
  - `isoRoot`, `isoXAxis`, `isoYAxis`, `isoZAxis` で座標変換
- **上面図（Top）**: デバッグ用の補助ビュー（将来的にオプション化？）

### 描画順序制御
- `depth` プロパティを使用
- depth が低いものから順に描画（奥→手前）
- プレイヤーの depth は `floor(x) + floor(y)` で計算

### 物理演算
- 重力加速度: `0.0029` (サンプルと同じ値)
- ジャンプ初速: `0.1`
- フレームレートはp5.jsのデフォルト（60fps想定）

---

## ドキュメント管理ルール

このプロジェクトでは、Claude Code とのやり取りや開発計画を以下のドキュメントで管理します:

- **`docs/todo.md`** (このファイル): タスク管理、開発進捗、技術メモ（日本語）
- **`CLAUDE.md`**: Claude Code への技術的指示、コーディング規約（英語）
- **`README.md`**: プロジェクト概要、セットアップ手順（日本語）

### 更新ルール
- 新しいタスクが発生したら、このファイルに追記
- タスク完了時は `[x]` にマーク
- 技術的な発見や重要な決定事項は「技術的な課題・メモ」セクションに記録
- Claude Code と共有すべき情報は適宜 `CLAUDE.md` にも反映

---

## 実装成果まとめ (Phase 1)

### 実装したファイル
```
client/src/app/
├── models/
│   ├── vec2.model.ts              # 2Dベクトル演算クラス
│   ├── player.model.ts            # プレイヤー状態管理
│   ├── level.model.ts             # レベル（マップ）管理
│   ├── avatar-data.model.ts       # アバターデータ定義
│   └── drawers/
│       ├── drawer.interface.ts    # 描画インターフェース
│       ├── quad-drawer.ts         # 四角形描画
│       ├── shadow-drawer.ts       # 影描画
│       └── avatar-drawer.ts       # アバター描画
├── services/
│   └── game.service.ts            # ゲームロジック
├── utils/
│   └── render.util.ts             # 描画ユーティリティ
└── components/
    └── p5-canvas/
        └── p5-canvas.component.ts # p5.js統合コンポーネント
```

### 主な機能
- ✅ クォータービュー（等角図）での描画
- ✅ WASD キーでの8方向移動
- ✅ Space キーでのジャンプと重力処理
- ✅ タイルの高さに応じた衝突判定
- ✅ レスポンシブ対応（ウィンドウサイズ自動調整）
- ✅ マップの自動中央配置
- ✅ カスタムアバターシステム（エディタ対応準備完了）

### 技術的な実装ポイント
- **クォータービューの中央配置**: `isoRoot = 画面中央 - (マップサイズ/2 × 軸ベクトル)`で正確に計算
- **depth-based rendering**: 描画順序を制御して奥行き表現
- **Angular Signals**: ゲーム状態管理にSignalsを活用
- **p5.js インスタンスモード**: Angularとの統合パターン

---

最終更新日: 2025-10-23