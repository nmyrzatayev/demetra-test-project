import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Job } from "bull";
export declare class UserQueueConsumer {
    private userRepository;
    constructor(userRepository: Repository<User>);
    setStatus(job: Job<{
        userId: number;
    }>): Promise<void>;
}
