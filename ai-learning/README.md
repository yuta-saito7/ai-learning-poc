# AI Learning App - ローカル開発環境

Vue.js + Nuxt.js フロントエンドと NestJS バックエンドによる AI チャットアプリケーションの PoC です。

## 🛠 技術スタック

### フロントエンド
- **Nuxt 3** - Vue.js フレームワーク
- **Tailwind CSS** - ユーティリティファーストCSS
- **TypeScript** - 型安全性

### バックエンド  
- **NestJS** - Node.js フレームワーク
- **TypeScript** - 型安全性
- **MySQL** - データベース
- **OpenAI** - AI チャット機能

## 🚀 クイックスタート

### 1. 必要な環境
- Node.js 20+
- Docker & Docker Compose
- Azure OpenAI リソース（API キー）

### 2. セットアップ実行
```bash
# 開発環境の自動セットアップ
./setup-dev.sh
```

### 3. 環境変数設定
```bash
# backend/.env ファイルを編集
cp backend/.env.example backend/.env
# OpenAI の設定を追加してください
```

### 4. アプリケーション起動

**バックエンド起動 (Terminal 1)**
```bash
cd backend
npm run start:dev
```

**フロントエンド起動 (Terminal 2)**  
```bash
cd frontend
npm run dev
```

## 📱 アクセス URL

- **フロントエンド**: http://localhost:3000
- **バックエンド API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/ai/health
- **phpMyAdmin**: http://localhost:8080

## 🔧 開発コマンド

### バックエンド
```bash
cd backend

# 開発サーバー起動
npm run start:dev

# ビルド
npm run build

# テスト実行
npm run test

# コード整形
npm run lint
```

### フロントエンド
```bash
cd frontend

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 静的サイト生成
npm run generate
```

## 🗄 データベース

### MySQL 接続情報
- **Host**: localhost:3306
- **Database**: aiapp_dev
- **Root Password**: password
- **App User**: appuser / apppass

### phpMyAdmin
- URL: http://localhost:8080
- Username: root
- Password: password

## 📝 API エンドポイント

### チャット
```bash
POST /ai/chat
Content-Type: application/json

{
  "prompt": "こんにちは"
}
```

### 履歴取得
```bash
GET /ai/history
```

### ヘルスチェック
```bash
GET /ai/health
```

## 🔒 環境変数

### backend/.env
```env
# OpenAI 設定
OPENAI_ENDPOINT=https://your-resource.openai.azure.com
OPENAI_DEPLOYMENT=gpt-4o-mini  
OPENAI_API_KEY=your-api-key

# MySQL 設定
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DATABASE=aiapp_dev

# アプリ設定
PORT=3001
NODE_ENV=development
```

### frontend/.env
```env
NUXT_PUBLIC_API_BASE=http://localhost:3001
```

## 🚢 本番デプロイ

詳細は [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) を参照してください。

- **フロントエンド**: Azure Static Web Apps
- **バックエンド**: Azure Container Apps  
- **データベース**: Azure Database for MySQL

## 🔍 トラブルシューティング

### データベース接続エラー
```bash
# MySQL コンテナの状態確認
docker-compose -f docker-compose.dev.yml ps

# ログ確認
docker-compose -f docker-compose.dev.yml logs mysql
```

### ポート競合
```bash
# 使用中ポートの確認
netstat -tlnp | grep :3000
netstat -tlnp | grep :3001
```

### コンテナリセット
```bash
# 開発環境の完全リセット
docker-compose -f docker-compose.dev.yml down -v
./setup-dev.sh
```

## 📚 参考資料

- [Nuxt 3 Documentation](https://nuxt.com/)
- [NestJS Documentation](https://nestjs.com/)
- [Azure OpenAI Documentation](https://docs.microsoft.com/azure/ai-services/openai/)
- [Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure Container Apps](https://docs.microsoft.com/azure/container-apps/)