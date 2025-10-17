# AI Learning Database

このディレクトリには、データベース関連の資材を配置します。

## 構成

- `init-db/`: データベース初期化スクリプト
- `my.cnf`: MySQL設定ファイル
- `docker-compose.db.yml`: データベース専用compose（オプション）

## 使用方法

### 開発環境
```bash
# データベースのみ起動
docker compose -f docker-compose.dev.yml up -d mysql

# 全サービス起動
docker compose -f docker-compose.full.yml up -d
```

### 本番環境
Azure Database for MySQL を使用

## 接続情報

- **ホスト**: localhost (開発時)
- **ポート**: 3306
- **データベース**: aiapp_dev
- **ユーザー**: appuser
- **パスワード**: apppass (開発時)