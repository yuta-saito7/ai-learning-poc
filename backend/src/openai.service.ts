import { Injectable, Logger } from '@nestjs/common';
import { AzureOpenAI } from 'openai';
import { DefaultAzureCredential, getBearerTokenProvider } from '@azure/identity';

@Injectable()
export class OpenAIService {
  private client?: AzureOpenAI;
  private readonly logger = new Logger(OpenAIService.name);

  constructor() {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o-mini';
    const apiVersion = process.env.OPENAI_API_VERSION || '2024-07-01-preview';
    try {
      if (!endpoint) {
        this.logger.warn('AZURE_OPENAI_ENDPOINT 未設定のためモック応答を使用します');
        return; // leave client undefined for mock
      }
      if (process.env.AZURE_OPENAI_API_KEY) {
        this.client = new AzureOpenAI({ endpoint, apiKey: process.env.AZURE_OPENAI_API_KEY, apiVersion, deployment });
      } else {
        const credential = new DefaultAzureCredential();
        const scope = 'https://cognitiveservices.azure.com/.default';
        const tokenProvider = getBearerTokenProvider(credential, scope);
        this.client = new AzureOpenAI({ endpoint, azureADTokenProvider: tokenProvider, apiVersion, deployment });
      }
    } catch (e) {
      this.logger.error(`AzureOpenAI 初期化失敗: ${(e as Error).message}`);
    }
  }

  async simpleChat(prompt: string) {
    if (!this.client) {
      return `MOCK RESPONSE: ${prompt}`;
    }
    const completion = await this.client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: '',
      max_tokens: 200
    });
    return completion.choices[0].message.content;
  }
}