import { Injectable, Logger, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MarketService {
    private readonly logger = new Logger(MarketService.name);

    constructor(private readonly httpService: HttpService) { }

    async getBitcoinPrice() {
        // 1. The Target URL
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

        try {
            let result = await firstValueFrom(this.httpService.get(url));
            let price: number = 0;
            if(result?.data?.bitcoin){
                price = result.data.bitcoin.usd;
            }
            return {
                asset: 'BTC',
                price_usd: price,
                timestamp: new Date().toISOString(),
                source: 'CoinGecko'
            };

        } catch (error) {
            const err = error as AxiosError;
            this.logger.error(`Failed to fetch price: ${err.message}`);
            throw new HttpException('Market Data Unavailable', 503);
        }
    }
}