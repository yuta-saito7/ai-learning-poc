import { Controller, Get, Query } from '@nestjs/common';
import { OpenAIService } from './openai.service';

@Controller('ai')
export class OpenAIController {
  constructor(private readonly openAI: OpenAIService) {}

  @Get('chat')
  async chat(@Query('q') q: string) {
    const answer = await this.openAI.simpleChat(q || 'Hello');
    return { answer };
  }
}