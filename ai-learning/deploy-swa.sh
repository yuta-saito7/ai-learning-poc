#!/bin/bash

# Azure Static Web Apps デプロイメントスクリプト

echo "🚀 Starting Azure Static Web Apps deployment..."

# フロントエンドディレクトリに移動
cd frontend

# 依存関係のインストール
echo "📦 Installing dependencies..."
npm ci

# アプリケーションのビルド
echo "🏗️ Building application..."
npm run build

# SWA CLI を使用してデプロイ
echo "🌐 Deploying to Azure Static Web Apps..."
npx swa deploy --env production

echo "✅ Deployment completed!"
echo "🔗 Your app should be available at your Azure Static Web Apps URL"