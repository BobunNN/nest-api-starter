import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { Role } from 'src/common/roles.enum';


export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @MaxLength(30, { message: 'First name is too long' })
    @IsNotEmpty({ message: 'First name is required' })
    firstName!: string;

    @ApiProperty()
    @IsString()
    @MaxLength(30, { message: 'Last name is too long' })
    @IsNotEmpty({ message: 'Last name is required' })
    lastName!: string;

    @ApiProperty()
    @IsEmail()
    @MaxLength(50, { message: 'Email is too long' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;
    
    role!: Role;
}
