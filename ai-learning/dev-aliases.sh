#!/bin/bash

# AI Learning Project - 開発用コマンド

# Docker Compose コマンド
alias dc-up='docker compose -f docker-compose.dev.yml up -d'
alias dc-down='docker compose -f docker-compose.dev.yml down'
alias dc-ps='docker compose -f docker-compose.dev.yml ps'
alias dc-logs='docker compose -f docker-compose.dev.yml logs'

# フル環境用（オプション）
alias dc-full-up='docker compose -f docker-compose.full.yml up -d --build'
alias dc-full-down='docker compose -f docker-compose.full.yml down'

# 開発サーバー起動用
alias start-backend='cd backend && npm run start:dev'
alias start-frontend='cd frontend && npm run dev'

echo "開発用エイリアスが設定されました!"
echo "使用方法:"
echo "  dc-up      : データベース起動"
echo "  dc-down    : データベース停止"
echo "  dc-ps      : 状態確認"
echo "  dc-logs    : ログ表示"