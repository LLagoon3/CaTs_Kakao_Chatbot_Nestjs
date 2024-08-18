import axios, { AxiosResponse } from 'axios';
import { RestaurantInfo, RestaurantInfoBody } from '../interfaces/restaurant_info';
import TokenHandler from './db_token_handler';
import ApiUrls from '../interfaces/api_urls';

// 테스트 데이터

export default class RestaurantInfoHandler{

    // restaurantInfo 파싱 및 db로 전송
    public static async createRestaurantInfo(apiUrls: ApiUrls, restaurantInfo: RestaurantInfo): Promise<void> {
        const accessToken = await TokenHandler.getToken(apiUrls);
        for (const [date, restaurantObj] of Object.entries(restaurantInfo)) {
            for (const [restaurantName, timeOfDayObj] of Object.entries(restaurantObj)) {
                for (const [timeOfDay, menu] of Object.entries(timeOfDayObj)) {
                    try {
                        const body: RestaurantInfoBody = {
                            'date': date,
                            'restaurantName': restaurantName,
                            'timeOfDay': timeOfDay,
                            'menu': menu.join(' ')
                        }
                        const response: AxiosResponse = await axios.post(apiUrls.url + '/kakaochatbot/restaurantinfo/', body,{
                                            headers: {
                                                'Authorization': `Bearer ${accessToken}`
                                            }});
                        console.log(body);
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        }
    }

    // db 정보를 RestaurantInfo 형태로 날짜 기준으로 파싱
    public static async readRestaurantInfo(apiUrls: ApiUrls, date: string): Promise<RestaurantInfo | null> {
        const accessToken = await TokenHandler.getToken(apiUrls);
        try {
            const response: AxiosResponse = await axios.get(apiUrls.url + `/kakaochatbot/restaurantinfo/${date}/`, {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`
                                }});
            // date에 해당하는 레코드들 배열로 반환
            const bodyArray: RestaurantInfoBody[] = response.data;
            const restaurantInfo: RestaurantInfo = { };
            restaurantInfo[date] = {};

            bodyArray.forEach((ele) => {
                if (!restaurantInfo[ele.date][ele.restaurantName]) restaurantInfo[ele.date][ele.restaurantName] = {};
                restaurantInfo[ele.date][ele.restaurantName][ele.timeOfDay] = ele.menu.split(' ');
            })
            
            return restaurantInfo
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

// import MenuCrawler from './menu_crawler';
// async function testFunc() {
//     // const mc = new MenuCrawler('https://www.cbnucoop.com/service/restaurant/');
//     // const restaurantInfo = await mc.parseRestaurantInfo();
//     // console.log(restaurantInfo);
//     // await RestaurantInfoHandler.createRestaurantInfo(apiUrl, restaurantInfo);
//     const test = await RestaurantInfoHandler.readRestaurantInfo('http://0.0.0.0:8000', '2024-08-16');
//     console.log(test);
// }

// testFunc()