# AI Learning PoC

Nuxt (Static Web Apps) + NestJS (Container Apps) + Azure OpenAI + MySQL PoC.

## フォルダ
- `frontend/` Nuxt3 SSG
- `backend/` NestJS API (OpenAI chat)

## ローカル開発
```bash
# Frontend
cd frontend && npm install && npm run dev
# Backend
cd backend && npm install && npm run start:dev
```

環境変数例 (`backend/.env`):
```
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_API_KEY=... # もしくは Managed Identity で未設定
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini
OPENAI_API_VERSION=2024-07-01-preview
```

## デプロイ
- フロント: GitHub Actions `frontend-swa.yml`（main pushで Static Web Apps）
- バックエンド: GitHub Actions `backend-containerapps.yml`

## 次ステップ
- TypeORM 導入 & MySQL 接続
- Managed Identity への移行
- Key Vault でシークレット管理
