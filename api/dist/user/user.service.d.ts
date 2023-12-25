import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './user-create.dto';
import { Queue } from 'bull';
import { Cache } from 'cache-manager';
export declare class UserService {
    private userRepository;
    private userQueue;
    private readonly cacheManager;
    constructor(userRepository: Repository<User>, userQueue: Queue, cacheManager: Cache);
    create(userCreateDto: UserCreateDto): Promise<User>;
    findOne(id: number): Promise<unknown>;
    generatePasswordHash(password: any): Promise<string>;
}
