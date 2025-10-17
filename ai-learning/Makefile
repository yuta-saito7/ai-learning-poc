# AI Learning Project - Development Commands

.PHONY: help dev-up dev-down dev-status dev-logs start-backend start-frontend full-up full-down

# デフォルトコマンド
help:
	@echo "利用可能なコマンド:"
	@echo "  make dev-up        - データベース起動"
	@echo "  make dev-down      - データベース停止"
	@echo "  make dev-status    - サービス状態確認"
	@echo "  make dev-logs      - ログ表示"
	@echo "  make start-backend - バックエンド開発サーバー起動"
	@echo "  make start-frontend- フロントエンド開発サーバー起動"
	@echo "  make full-up       - 完全コンテナ環境起動"
	@echo "  make full-down     - 完全コンテナ環境停止"

# データベース関連
dev-up:
	docker compose -f docker-compose.dev.yml up -d

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-status:
	docker compose -f docker-compose.dev.yml ps

dev-logs:
	docker compose -f docker-compose.dev.yml logs -f

# 開発サーバー起動
start-backend:
	cd backend && npm run start:dev

start-frontend:
	cd frontend && npm run dev

# 完全コンテナ環境
full-up:
	docker compose -f docker-compose.full.yml up -d --build

full-down:
	docker compose -f docker-compose.full.yml down

# 依存関係インストール
install:
	cd backend && npm install
	cd frontend && npm install

# デプロイ関連
deploy:
	./deploy.sh

deploy-tag:
	./deploy.sh $(TAG)

# 本番用イメージビルドテスト
build-prod:
	docker build -t aiapi:prod ./backend
	docker build -t frontend:prod ./frontend

# クリーンアップ
clean:
	docker compose -f docker-compose.dev.yml down -v
	docker compose -f docker-compose.full.yml down -v
	docker system prune -f