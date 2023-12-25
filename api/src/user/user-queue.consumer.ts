import { Process, Processor } from "@nestjs/bull";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Job } from "bull";

@Processor('USER_QUEUE')
export class UserQueueConsumer {
    constructor(@InjectRepository(User)
    private userRepository:Repository<User>
    ) {}

    @Process('SET_STATUS')
    async setStatus(job:Job<{userId:number}>):Promise<void> {
        const user = await this.userRepository.findOneBy({id:job.data.userId});
        user.status = true;
        await this.userRepository.save(user);
    }
}