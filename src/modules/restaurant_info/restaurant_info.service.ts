import { Injectable } from '@nestjs/common';
import RestaurantInfoHandler from '../../shared/utills/db_restaurant_info_handler';
import { ConfigService } from '@nestjs/config';
import { RestaurantInfo } from '@/src/shared/interfaces/restaurant_info';

@Injectable()
export class RestaurantInfoService{
    constructor(private configService: ConfigService) { }
    
    async getRestaurantInfo(date: string): Promise<RestaurantInfo | null> {
        return await RestaurantInfoHandler.readRestaurantInfo(this.configService.get<string>('NEXT_PUBLIC_BASE_API_URL'), date);
    }
}