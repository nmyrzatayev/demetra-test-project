import { UserService } from './user.service';
import { UserCreateDto } from './user-create.dto';
import { User } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(userCreateDto: UserCreateDto): Promise<User>;
    findOne(id: number): Promise<unknown>;
}
