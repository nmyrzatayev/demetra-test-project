import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { BullModule } from '@nestjs/bull';
import { UserQueueConsumer } from './user/user-queue.consumer';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'demetra_test',
      entities: [User],
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'USER_QUEUE',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
