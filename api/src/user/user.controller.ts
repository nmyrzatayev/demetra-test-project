import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './user-create.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post('')
    async create(@Body() userCreateDto:UserCreateDto):Promise<User> {
        return this.userService.create(userCreateDto);
    }

    @Get('get-user-by-id/:id')
    async findOne(@Param('id') id:number) {
        const user = await this.userService.findOne(id);
        return user;
    }
}
