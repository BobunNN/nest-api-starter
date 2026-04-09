import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class ProfileDto {
    @IsOptional()
    @IsString()
    @MaxLength(20, { message: 'Phone number is too long' })
    phoneNumber?: string;
}
