import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UserCreateDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string;
    
    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    name:string;
}