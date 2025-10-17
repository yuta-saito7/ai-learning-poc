import { Module } from '@nestjs/common';
import { AIController } from './ai.controller';
import { OpenAIService } from './openai.service';
import { DatabaseService } from './database.service';

@Module({
  controllers: [AIController],
  providers: [OpenAIService, DatabaseService],
})
export class AIModule {}