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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const bull_1 = require("@nestjs/bull");
const cache_manager_1 = require("@nestjs/cache-manager");
let UserService = class UserService {
    constructor(userRepository, userQueue, cacheManager) {
        this.userRepository = userRepository;
        this.userQueue = userQueue;
        this.cacheManager = cacheManager;
    }
    async create(userCreateDto) {
        const { email, password, name } = userCreateDto;
        const candidate = await this.userRepository.findOne({ where: { email } });
        if (candidate) {
            throw { statusCode: 400, message: "ERR_USER_EMAIL_EXISTS" };
        }
        const passwordHash = await this.generatePasswordHash(password);
        const user = this.userRepository.create({
            email, password: passwordHash, name
        });
        await this.userRepository.save(user);
        await this.userQueue.add('SET_STATUS', {
            userId: user.id
        }, {
            delay: 10000
        });
        return user;
    }
    async findOne(id) {
        const cachedUser = await this.cacheManager.get(`user:${id}`);
        if (cachedUser && cachedUser['email']) {
            return cachedUser;
        }
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw { statusCode: 400, message: "ERR_USER_NOT_FOUND" };
        }
        await this.cacheManager.set(`user:${id}`, user, 1000 * 60 * 30);
        return user;
    }
    async generatePasswordHash(password) {
        const salt = await bcrypt.genSalt(4);
        return bcrypt.hash(password, salt);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, bull_1.InjectQueue)('USER_QUEUE')),
    __param(2, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object, Object])
], UserService);
//# sourceMappingURL=user.service.js.map