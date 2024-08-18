import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();


/*

# Directory Structure

src/
├── app.controller.ts
├── app.controller.spec.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── modules/
│   └── sample/
│       ├── sample.controller.ts
│       ├── sample.service.ts
│       ├── sample.module.ts
│       └── ...
├── common/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   ├── decorators/
│   └── pipes/
├── config/
│   ├── config.module.ts
│   ├── config.service.ts
│   └── ...
└── shared/
    ├── utils/
    ├── interfaces/
    ├── dto/
    └── ...
*/