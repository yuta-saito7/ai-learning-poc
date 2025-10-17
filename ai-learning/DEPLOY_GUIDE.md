# AI App PoC デプロイ手順

## 前提条件

- Azure CLI インストール済み
- Docker インストール済み
- Node.js 20+ インストール済み
- GitHub アカウント

## 1. Azure インフラ構築

```bash
# Azure にログイン
az login

# インフラ構築スクリプト実行
chmod +x setup-poc-infra.sh
./setup-poc-infra.sh
```

## 2. OpenAI リソース設定

```bash
# OpenAI リソースの Cognitive Services User ロールを Managed Identity に付与
OPENAI_RESOURCE_ID="/subscriptions/<subscription-id>/resourceGroups/<openai-rg>/providers/Microsoft.CognitiveServices/accounts/<openai-name>"
UAMI_PRINCIPAL_ID=$(az identity show --resource-group rg-aiapp-poc --name uami-aiapp-poc --query principalId -o tsv)

az role assignment create \
  --role "Cognitive Services User" \
  --assignee $UAMI_PRINCIPAL_ID \
  --scope $OPENAI_RESOURCE_ID
```

## 3. Container Registry への認証情報付与

```bash
# Managed Identity に ACR Pull ロールを付与
ACR_ID=$(az acr show --name acraiapppoc --resource-group rg-aiapp-poc --query id -o tsv)
az role assignment create \
  --role "AcrPull" \
  --assignee $UAMI_PRINCIPAL_ID \
  --scope $ACR_ID
```

## 4. バックエンドの初回デプロイ

```bash
# ACR にログイン
az acr login --name acraiapppoc

# イメージビルド & プッシュ
cd backend
docker build -t acraiapppoc.azurecr.io/aiapi:v1 .
docker push acraiapppoc.azurecr.io/aiapi:v1

# Container Apps 更新
az containerapp update \
  --name ca-aiapi-poc \
  --resource-group rg-aiapp-poc \
  --image acraiapppoc.azurecr.io/aiapi:v1 \
  --set-env-vars \
    OPENAI_ENDPOINT="https://your-openai.openai.azure.com" \
    OPENAI_DEPLOYMENT="gpt-4o-mini" \
    OPENAI_API_KEY="your-api-key" \
    MYSQL_HOST="mysql-aiapp-poc.mysql.database.azure.com" \
    MYSQL_USER="appadmin" \
    MYSQL_PASSWORD="P@ssw0rd123!" \
    MYSQL_DATABASE="aiappdb"
```

## 5. フロントエンドデプロイ

### GitHub での設定

1. GitHub に新しいリポジトリを作成
2. コードをプッシュ
3. Azure Portal で Static Web Apps を作成
4. GitHub リポジトリを接続
5. ビルド設定:
   - App location: `/frontend`
   - Api location: `(empty)`
   - Output location: `.output/public`

### Static Web Apps での環境変数設定

Azure Portal > Static Web Apps > Configuration で設定:

```
NUXT_PUBLIC_API_BASE = https://ca-aiapi-poc.<random>.japaneast.azurecontainerapps.io
```

## 6. GitHub Actions 設定

### Service Principal 作成

```bash
az ad sp create-for-rbac \
  --name "sp-aiapp-poc" \
  --role contributor \
  --scopes /subscriptions/<subscription-id>/resourceGroups/rg-aiapp-poc \
  --sdk-auth
```

出力された JSON を GitHub Secrets の `AZURE_CREDENTIALS` に設定。

### その他の Secrets 設定

GitHub リポジトリの Settings > Secrets and variables > Actions で設定:

- `OPENAI_ENDPOINT`
- `OPENAI_DEPLOYMENT`
- `OPENAI_API_KEY`
- `MYSQL_HOST`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`

## 7. 動作確認

1. Container Apps の URL にアクセスして API の health チェック:
   ```
   https://ca-aiapi-poc.<random>.japaneast.azurecontainerapps.io/ai/health
   ```

2. Static Web Apps の URL にアクセスしてフロントエンド確認:
   ```
   https://swa-aiapp-poc.<random>.azurestaticapps.net
   ```

3. チャット機能のテスト
4. MySQL への履歴保存確認

## 8. トラブルシューティング

### Container Apps ログ確認
```bash
az containerapp logs show \
  --name ca-aiapi-poc \
  --resource-group rg-aiapp-poc \
  --follow
```

### MySQL 接続テスト
```bash
mysql -h mysql-aiapp-poc.mysql.database.azure.com \
      -u apladmin \
      -p \
      aiappdb
```

### Container Apps の環境変数確認
```bash
az containerapp show \
  --name ca-aiapi-poc \
  --resource-group rg-aiapp-poc \
  --query properties.template.containers[0].env
```

## 9. 後片付け（必要時）

```bash
# リソースグループ全体を削除
az group delete --name rg-aiapp-poc --yes --no-wait
```