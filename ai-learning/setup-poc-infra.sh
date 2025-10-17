#!/bin/bash

# PoC用 Azure インフラ構築スクリプト
set -e

# 変数設定
RG_NAME="rg-aiapp-poc"
LOCATION="japaneast"
ACR_NAME="acraiapppoc"
MYSQL_NAME="mysql-aiapp-poc"
CA_ENV_NAME="cae-aiapp-poc"
CA_NAME="ca-aiapi-poc"
UAMI_NAME="uami-aiapp-poc"

echo "=== Azure AI App PoC インフラ構築開始 ==="

# 1. リソースグループ作成
echo "1. リソースグループ作成..."
az group create --name $RG_NAME --location $LOCATION

# 2. User Assigned Managed Identity
echo "2. Managed Identity 作成..."
az identity create --resource-group $RG_NAME --name $UAMI_NAME
UAMI_ID=$(az identity show --resource-group $RG_NAME --name $UAMI_NAME --query id -o tsv)
UAMI_CLIENT_ID=$(az identity show --resource-group $RG_NAME --name $UAMI_NAME --query clientId -o tsv)

# 3. Container Registry
echo "3. Container Registry 作成..."
az acr create --resource-group $RG_NAME --name $ACR_NAME --sku Basic

# 4. MySQL Flexible Server (Public access)
echo "4. MySQL Flexible Server 作成..."
az mysql flexible-server create \
  --resource-group $RG_NAME \
  --name $MYSQL_NAME \
  --admin-user appadmin \
  --admin-password 'P@ssw0rd123!' \
  --sku-name Standard_B1ms \
  --tier Burstable \
  --public-access 0.0.0.0-255.255.255.255 \
  --storage-size 32 \
  --version 8.0.21

# 5. データベース作成
echo "5. アプリ用データベース作成..."
az mysql flexible-server db create \
  --resource-group $RG_NAME \
  --server-name $MYSQL_NAME \
  --database-name aiappdb

# 6. Container Apps Environment
echo "6. Container Apps Environment 作成..."
az containerapp env create \
  --name $CA_ENV_NAME \
  --resource-group $RG_NAME \
  --location $LOCATION

# 7. Container App (初期イメージでプレースホルダー)
echo "7. Container App 作成..."
az containerapp create \
  --name $CA_NAME \
  --resource-group $RG_NAME \
  --environment $CA_ENV_NAME \
  --image mcr.microsoft.com/azuredocs/containerapps-helloworld:latest \
  --target-port 80 \
  --ingress external \
  --min-replicas 1 \
  --max-replicas 3 \
  --user-assigned $UAMI_ID

echo "=== 作成完了 ==="
echo "リソースグループ: $RG_NAME"
echo "ACR: $ACR_NAME.azurecr.io"
echo "MySQL: $MYSQL_NAME.mysql.database.azure.com"
echo "Container App: https://$(az containerapp show --name $CA_NAME --resource-group $RG_NAME --query properties.configuration.ingress.fqdn -o tsv)"
echo "Managed Identity Client ID: $UAMI_CLIENT_ID"

echo ""
echo "次のステップ:"
echo "1. OpenAI リソースへのアクセス権を Managed Identity に付与"
echo "2. Nuxt アプリを Static Web Apps にデプロイ"
echo "3. NestJS アプリをビルドして Container Apps にデプロイ"