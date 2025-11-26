import { Module } from '@nestjs/common';
import { MarketController } from './market.controller';
import { HttpModule } from '@nestjs/axios';
import { MarketService } from './market.service';
@Module({
  imports:[HttpModule],
  controllers: [MarketController],
  providers: [MarketService]
})
export class MarketModule {}
