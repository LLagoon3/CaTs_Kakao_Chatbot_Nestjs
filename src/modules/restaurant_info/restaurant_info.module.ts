import { Module } from '@nestjs/common';
import { RestaurantInfoController } from './restaurant_info.controller';
import { RestaurantInfoService } from './restaurant_info.service';

@Module({
    controllers: [RestaurantInfoController],
    providers: [RestaurantInfoService],
})
export class RestaurantInfoModule { }