import { Controller, Get, Param } from '@nestjs/common';
import { RestaurantInfoService } from './restaurant_info.service';
import { RestaurantInfo } from '@/src/shared/interfaces/restaurant_info';

@Controller('restaurant_info')
export class RestaurantInfoController{
    constructor(private readonly restaurantInfoService: RestaurantInfoService) { }
    
    @Get(':date')
    async getRestaurantInfo(@Param('date') date: string): Promise<RestaurantInfo | null>  {
        return await this.restaurantInfoService.getRestaurantInfo(date);
    }
}