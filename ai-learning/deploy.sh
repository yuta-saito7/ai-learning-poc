#!/bin/bash

# Azure Container Apps デプロイスクリプト
set -e

# 設定
REGISTRY_NAME="acraiapppoc"
RESOURCE_GROUP="rg-aiapp-poc"
LOCATION="japaneast"
BACKEND_APP_NAME="ca-aiapi-poc"
FRONTEND_APP_NAME="ca-frontend-poc"
ENVIRONMENT_NAME="env-aiapp-poc"

# イメージタグ（Gitコミットハッシュまたはタイムスタンプ）
IMAGE_TAG=${1:-$(date +%Y%m%d-%H%M%S)}

echo "🚀 Azure Container Apps デプロイを開始します..."
echo "Image Tag: $IMAGE_TAG"

# Azure にログイン
echo "📝 Azure にログイン中..."
az login

# Container Registry にログイン
echo "🔐 Container Registry にログイン中..."
az acr login --name $REGISTRY_NAME

# バックエンドイメージのビルドとプッシュ
echo "🔨 バックエンドイメージをビルド中..."
docker build -t $REGISTRY_NAME.azurecr.io/aiapi:$IMAGE_TAG ./backend
echo "📤 バックエンドイメージをプッシュ中..."
docker push $REGISTRY_NAME.azurecr.io/aiapi:$IMAGE_TAG

# フロントエンドイメージのビルドとプッシュ
echo "🔨 フロントエンドイメージをビルド中..."
docker build -t $REGISTRY_NAME.azurecr.io/frontend:$IMAGE_TAG ./frontend
echo "📤 フロントエンドイメージをプッシュ中..."
docker push $REGISTRY_NAME.azurecr.io/frontend:$IMAGE_TAG

# バックエンドのデプロイ
echo "🚀 バックエンドをデプロイ中..."
az containerapp update \
  --name $BACKEND_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --image $REGISTRY_NAME.azurecr.io/aiapi:$IMAGE_TAG

# フロントエンドのデプロイ
echo "🚀 フロントエンドをデプロイ中..."
az containerapp update \
  --name $FRONTEND_APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --image $REGISTRY_NAME.azurecr.io/frontend:$IMAGE_TAG

# デプロイ完了
echo "✅ デプロイが完了しました！"
echo ""
echo "🌐 アクセスURL:"
echo "   Backend:  https://ca-aiapi-poc.japaneast.azurecontainerapps.io"
echo "   Frontend: https://ca-frontend-poc.japaneast.azurecontainerapps.io"
echo ""
echo "🔍 ログ確認:"
echo "   az containerapp logs show --name $BACKEND_APP_NAME --resource-group $RESOURCE_GROUP --follow"
echo "   az containerapp logs show --name $FRONTEND_APP_NAME --resource-group $RESOURCE_GROUP --follow"