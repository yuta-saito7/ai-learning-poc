#!/bin/bash

# AI Learning App 開発環境セットアップスクリプト

set -e

echo "🚀 AI Learning App 開発環境セットアップ開始"

# プロジェクトディレクトリに移動
cd "$(dirname "$0")"

echo "📁 現在のディレクトリ: $(pwd)"

# Docker Compose でデータベース起動
echo "🐳 MySQL データベースを起動中..."
docker-compose -f docker-compose.dev.yml up -d mysql

# データベースの起動を待機
echo "⏳ データベースの起動を待機中..."
sleep 10

# バックエンドの依存関係インストール
echo "📦 バックエンドの依存関係をインストール中..."
cd backend
npm install
cd ..

# フロントエンドの依存関係インストール
echo "📦 フロントエンドの依存関係をインストール中..."
cd frontend
npm install
cd ..

echo "✅ セットアップ完了！"
echo ""
echo "📝 次のステップ:"
echo "1. backend/.env ファイルにOpenAI APIの設定を追加"
echo "2. バックエンド起動: cd backend && npm run start:dev"
echo "3. フロントエンド起動: cd frontend && npm run dev"
echo "4. ブラウザで http://localhost:3000 にアクセス"
echo ""
echo "🔧 開発用ツール:"
echo "- phpMyAdmin: http://localhost:8080"
echo "- API Health Check: http://localhost:3001/ai/health"