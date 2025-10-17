# AI App PoC 環境変数設定ガイド

## GitHub Secrets 設定

以下の秘密情報を GitHub リポジトリの Settings > Secrets and variables > Actions で設定してください。

### Azure 認証
- `AZURE_CREDENTIALS`: Service Principal の JSON
  ```json
  {
    "clientId": "<client-id>",
    "clientSecret": "<client-secret>",
    "subscriptionId": "<subscription-id>",
    "tenantId": "<tenant-id>"
  }
  ```

### OpenAI 設定
- `OPENAI_ENDPOINT`: Azure OpenAI のエンドポイント
  - 例: `https://your-openai.openai.azure.com`
- `OPENAI_DEPLOYMENT`: デプロイメント名
  - 例: `gpt-4o-mini`
- `OPENAI_API_KEY`: Azure OpenAI の API キー（PoC用）

### MySQL 設定
- `MYSQL_HOST`: MySQL サーバーのホスト名
  - 例: `mysql-aiapp-poc.mysql.database.azure.com`
- `MYSQL_USER`: データベースユーザー名
  - 例: `appadmin`
- `MYSQL_PASSWORD`: データベースパスワード
- `MYSQL_DATABASE`: データベース名
  - 例: `aiappdb`

## Static Web Apps 設定

Azure Portal の Static Web Apps で以下の環境変数を設定：

### Application settings
- `NUXT_PUBLIC_API_BASE`: Container Apps の URL
  - 例: `https://ca-aiapi-poc.kindpond-12345678.japaneast.azurecontainerapps.io`

## ローカル開発用（.env ファイル）

### backend/.env
```env
OPENAI_ENDPOINT=https://your-openai.openai.azure.com
OPENAI_DEPLOYMENT=gpt-4o-mini
OPENAI_API_KEY=your-api-key
MYSQL_HOST=mysql-aiapp-poc.mysql.database.azure.com
MYSQL_USER=appadmin
MYSQL_PASSWORD=P@ssw0rd123!
MYSQL_DATABASE=aiappdb
PORT=3000
```

### frontend/.env
```env
NUXT_PUBLIC_API_BASE=http://localhost:3000
```

## 設定手順

1. Azure リソース作成後、上記の値を収集
2. GitHub Secrets に設定
3. Container Apps デプロイ
4. Static Web Apps に環境変数設定
5. フロントエンドデプロイ

## セキュリティ注意事項（本番移行時）

- API Key ではなく Managed Identity を使用
- Key Vault での秘密管理
- CORS 設定の厳格化
- HTTPS 強制
- ファイアウォール設定の見直し