import { Injectable } from '@nestjs/common';
import { DefaultAzureCredential } from '@azure/identity';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAIService {
  private client: OpenAI;
  private credential?: DefaultAzureCredential;

  constructor() {
    // PoC用: API Key を環境変数から取得（簡単）
    if (process.env.OPENAI_API_KEY) {
      this.client = new OpenAI({
        baseURL: process.env.OPENAI_ENDPOINT + '/openai/v1/',
        apiKey: process.env.OPENAI_API_KEY,
      });
    } else {
      // Managed Identity を使用（本格運用時）
      this.credential = new DefaultAzureCredential();
      this.client = new OpenAI({
        baseURL: process.env.OPENAI_ENDPOINT + '/openai/v1/',
        apiKey: 'dummy-key', // Managed Identityの場合、実際のトークンは動的に取得
      });
    }
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      // Managed Identityを使用する場合のトークン取得
      if (this.credential && !process.env.OPENAI_API_KEY) {
        const accessToken = await this.credential.getToken('https://cognitiveservices.azure.com/.default');
        this.client = new OpenAI({
          baseURL: process.env.OPENAI_ENDPOINT + '/openai/v1/',
          apiKey: accessToken.token,
        });
      }

      const response = await this.client.chat.completions.create({
        model: process.env.OPENAI_DEPLOYMENT || 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 512,
        temperature: 0.7,
      });

      return response.choices[0]?.message?.content || 'レスポンスが生成できませんでした。';
    } catch (error) {
      console.error('OpenAI API エラー:', error);
      throw new Error('AI レスポンスの生成に失敗しました。');
    }
  }
}