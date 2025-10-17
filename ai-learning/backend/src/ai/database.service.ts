import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private connection: mysql.Connection | null = null;

  async getConnection(): Promise<mysql.Connection> {
    if (!this.connection) {
      this.connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER || 'appadmin',
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE || 'aiappdb',
        ssl: { rejectUnauthorized: false }, // PoC用簡易設定
      });
    }
    return this.connection;
  }

  async saveConversation(prompt: string, response: string): Promise<void> {
    const conn = await this.getConnection();
    
    // テーブルが存在しない場合は作成
    await conn.execute(`
      CREATE TABLE IF NOT EXISTS conversations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        prompt TEXT,
        response TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.execute(
      'INSERT INTO conversations (prompt, response) VALUES (?, ?)',
      [prompt, response]
    );
  }

  async getRecentConversations(limit: number = 10): Promise<any[]> {
    const conn = await this.getConnection();
    const [rows] = await conn.execute(
      'SELECT * FROM conversations ORDER BY created_at DESC LIMIT ?',
      [limit]
    );
    return rows as any[];
  }
}