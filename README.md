# quarterViewGame

p5.jsを利用したクォータービューゲームプロジェクトです。ユーザーが自由に行動できる3D空間を提供し、アバターのカスタマイズやお部屋での交流を実現します。

## プロジェクト目標

### 初期目標
- ユーザーアバターのエディット機能の実装
- ユーザーが自由に動けるお部屋機能の導入
- クォータービューでの没入感のある体験の提供

## 技術スタック

### フロントエンド
- **Angular 19.2**: スタンドアロンコンポーネントアーキテクチャ
- **p5.js 2.0**: キャンバスベースのグラフィックス描画
- **PrimeNG 19**: UIコンポーネントライブラリ（Auraテーマ）
- **TypeScript 5.7**: 型安全な開発

## プロジェクト構成

```
quarterViewGame/
├── client/                        # Angularフロントエンドアプリケーション
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   └── p5-canvas/    # p5.jsキャンバスコンポーネント
│   │   │   ├── app.component.ts  # ルートコンポーネント
│   │   │   ├── app.config.ts     # アプリケーション設定（PrimeNG等）
│   │   │   └── app.routes.ts     # ルーティング設定
│   │   ├── styles.scss            # グローバルスタイル
│   │   └── main.ts                # アプリケーションエントリーポイント
│   ├── angular.json               # Angular CLI設定
│   ├── tsconfig.json              # TypeScript設定
│   └── package.json               # 依存関係管理
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Pages自動デプロイ設定
└── CLAUDE.md                      # Claude Code用プロジェクトガイド
```

## 開発環境セットアップ

### 前提条件
- Node.js (推奨: 最新LTS版)
- npm

### インストール

```bash
cd client
npm install
```

### 開発サーバーの起動

```bash
cd client
npm start
```

ブラウザで http://localhost:4200 を開いてアプリケーションにアクセスします。

### その他のコマンド

```bash
# プロダクションビルド
npm run build

# ファイル変更監視モード
npm run watch

# テスト実行
npm test

# 新しいコンポーネントの生成
ng generate component components/component-name
```

## デプロイ

### GitHub Pagesへの自動デプロイ
- `release`ブランチへのプッシュで自動的にGitHub Pagesにデプロイされます
- デプロイワークフロー: `.github/workflows/deploy.yml`
- デプロイURL: https://taiganoto.github.io/quarterViewGame/

### 手動ビルド（GitHub Pages用）

```bash
cd client
npm run build -- --base-href=/quarterViewGame/
```

## アーキテクチャの特徴

### p5.js統合パターン
- インスタンスモードのp5.jsをAngularコンポーネントと統合
- `ngOnInit()`でp5インスタンスを作成
- `ngOnDestroy()`で`p5Instance.remove()`を呼び出してクリーンアップ

### PrimeNG設定
- `app.config.ts`で`providePrimeNG`を使用したグローバル設定
- Auraテーマプリセットを使用
- ダークモード無効化

## 主な依存関係

| パッケージ | バージョン | 用途 |
|-----------|-----------|------|
| @angular/core | 19.2 | フロントエンドフレームワーク |
| p5 | 2.0 | キャンバス描画・グラフィックス |
| primeng | 19.1 | UIコンポーネント |
| @primeuix/themes | 1.2 | PrimeNGテーマ |
| typescript | 5.7 | 型システム |