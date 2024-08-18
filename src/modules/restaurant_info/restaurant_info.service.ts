import { Injectable } from '@nestjs/common';
import RestaurantInfoHandler from '../../shared/utills/db_restaurant_info_handler';
import { ConfigService } from '@nestjs/config';
import { RestaurantInfo } from '@/src/shared/interfaces/restaurant_info';
import ApiUrls from '@/src/shared/interfaces/api_urls';

@Injectable()
export class RestaurantInfoService{
    private apiUrls: ApiUrls = {
        url: '',
        apiLoginTokenUrl: '',
        apiRefreshTokenUrl: '',
        apiVerifyTokenUrl: ''
    };
    
    constructor(private configService: ConfigService) {
        const baseUrl = this.configService.get<string>('NEXT_PUBLIC_BASE_API_URL');
        this.apiUrls.url = baseUrl;
        this.apiUrls.apiLoginTokenUrl = `${baseUrl}/api/token/login/`;
        this.apiUrls.apiRefreshTokenUrl = `${baseUrl}/api/token/refresh/`;
        this.apiUrls.apiVerifyTokenUrl = `${baseUrl}/api/token/verify/`;
    }
    
    async getRestaurantInfo(date: string): Promise<RestaurantInfo | null> {
        return await RestaurantInfoHandler.readRestaurantInfo(this.apiUrls, date);
    }
}