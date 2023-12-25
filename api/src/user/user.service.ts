import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './user-create.dto';
import * as bcrypt from 'bcrypt';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectQueue('USER_QUEUE')
        private userQueue: Queue,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache
    ) { }

    async create(userCreateDto: UserCreateDto): Promise<User> {

        const { email, password, name } = userCreateDto;

        const candidate = await this.userRepository.findOne({ where: { email } })
        if (candidate) {
            throw { statusCode: 400, message: "ERR_USER_EMAIL_EXISTS" }
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

    async findOne(id: number) {
        const cachedUser = await this.cacheManager.get(`user:${id}`);

        if (cachedUser && cachedUser['email']) {
            return cachedUser;
        }

        const user = await this.userRepository.findOne({ where:{id} });

        if (!user) {
            throw { statusCode: 400, message: "ERR_USER_NOT_FOUND" }
        }
        await this.cacheManager.set(`user:${id}`, user, 1000 * 60 * 30);

        return user
    }

    async generatePasswordHash(password): Promise<string> {
        const salt = await bcrypt.genSalt(4);
        return bcrypt.hash(password, salt);
    }
}
