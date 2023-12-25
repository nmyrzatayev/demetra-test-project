"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserQueueConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserQueueConsumer = class UserQueueConsumer {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async setStatus(job) {
        const user = await this.userRepository.findOneBy({ id: job.data.userId });
        user.status = true;
        await this.userRepository.save(user);
    }
};
exports.UserQueueConsumer = UserQueueConsumer;
__decorate([
    (0, bull_1.Process)('SET_STATUS'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserQueueConsumer.prototype, "setStatus", null);
exports.UserQueueConsumer = UserQueueConsumer = __decorate([
    (0, bull_1.Processor)('USER_QUEUE'),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserQueueConsumer);
//# sourceMappingURL=user-queue.consumer.js.map