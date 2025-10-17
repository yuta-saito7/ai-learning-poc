FROM node:22-alpine as builder

WORKDIR /app

# package.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm ci

# ソースコードをコピー
COPY . .

# 本番用ビルド
RUN npm run build

# 本番用コンテナ
FROM node:22-alpine

WORKDIR /app

# 必要なファイルをコピー
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

# 本番依存関係のみインストール
RUN npm ci --only=production && npm cache clean --force

# ポート公開
EXPOSE 3000

# アプリケーション起動
CMD ["node", ".output/server/index.mjs"]