import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { RestaurantInfoModule } from './modules/restaurant_info/restaurant_info.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModule을 전역 모듈로 설정
    }),
    RestaurantInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
