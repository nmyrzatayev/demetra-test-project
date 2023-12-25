import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { UserQueueConsumer } from './user-queue.consumer';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({
      name: 'USER_QUEUE',
    }),
    CacheModule.register({
      ttl: 1000 * 60 * 30,
      store: redisStore,
      host: 'locale',
      port: 6379
    })
  ],
  providers: [UserService, UserQueueConsumer],
  controllers: [UserController]
})
export class UserModule { }
