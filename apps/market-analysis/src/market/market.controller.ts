import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { MarketService } from './market.service';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptors';

@Controller('market')
export class MarketController {
    constructor(private readonly marketService:MarketService){}
    @Get('/bitcoin')
    async getBitCoinPrice(){
        return this.marketService.getBitcoinPrice();
    }
}
