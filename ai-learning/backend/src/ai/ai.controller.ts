import { Controller, Post, Get, Body } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { DatabaseService } from './database.service';

@Controller('ai')
export class AIController {
  constructor(
    private readonly openaiService: OpenAIService,
    private readonly databaseService: DatabaseService,
  ) {}

  @Post('chat')
  async chat(@Body() body: { prompt: string }) {
    try {
      // OpenAI でレスポンス生成
      const response = await this.openaiService.generateResponse(body.prompt);
      
      // データベースに保存
      await this.databaseService.saveConversation(body.prompt, response);
      
      return {
        success: true,
        response,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Chat API エラー:', error);
      return {
        success: false,
        error: 'チャットの処理に失敗しました。',
      };
    }
  }

  @Get('history')
  async getHistory() {
    try {
      const conversations = await this.databaseService.getRecentConversations();
      return {
        success: true,
        conversations,
      };
    } catch (error) {
      console.error('履歴取得エラー:', error);
      return {
        success: false,
        error: '履歴の取得に失敗しました。',
      };
    }
  }

  @Get('health')
  async health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}