-- 開発用データベース初期化スクリプト

USE aiapp_dev;

-- 会話履歴テーブル
CREATE TABLE IF NOT EXISTS conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prompt TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- インデックス作成
CREATE INDEX idx_created_at ON conversations(created_at);

-- サンプルデータ（オプション）
INSERT INTO conversations (prompt, response) VALUES 
('Hello', 'こんにちは！何かお手伝いできることはありますか？'),
('AIについて教えて', 'AIは人工知能のことで、機械学習や深層学習などの技術を使って、人間のような知的な処理を行うシステムです。');