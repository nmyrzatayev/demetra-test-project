"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const bull_1 = require("@nestjs/bull");
const user_queue_consumer_1 = require("./user-queue.consumer");
const cache_manager_1 = require("@nestjs/cache-manager");
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            bull_1.BullModule.registerQueue({
                name: 'USER_QUEUE',
            }),
            cache_manager_1.CacheModule.register({
                ttl: 1000 * 60 * 30,
                store: cache_manager_redis_yet_1.redisStore,
                host: 'locale',
                port: 6379
            })
        ],
        providers: [user_service_1.UserService, user_queue_consumer_1.UserQueueConsumer],
        controllers: [user_controller_1.UserController]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map