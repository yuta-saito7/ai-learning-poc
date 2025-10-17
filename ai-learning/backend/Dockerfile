FROM node:22-alpine

WORKDIR /app

# package.json をコピーして依存関係をインストール
COPY package*.json ./
RUN npm ci --only=production

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# ポート公開
EXPOSE 3001

# アプリケーション起動
CMD ["npm", "run", "start:prod"]