import { Injectable, Logger, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

@Injectable()
export class MarketService {
    private readonly logger = new Logger(MarketService.name);

    constructor(private readonly httpService: HttpService) { }

    async getBitcoinPrice() {
        // 1. The Target URL
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

        try {
            this.logger.log('Fetching Bitcoin Price...');

            // 2. The Network Call
            const data = await this.httpService.get(url);
            console.log({ data })
            // 3. The Extraction
            const price: number = 0;

            this.logger.log(`Success: BTC is $${price}`);

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