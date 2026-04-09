import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty({ message: 'Current password is required' })
    currentPassword!: string;

    @IsString()
    @MaxLength(100, { message: 'Password is too long' })
    @IsNotEmpty({ message: 'New password is required' })
    newPassword!: string;

    @IsString()
    @IsNotEmpty({ message: 'Please confirm your new password' })
    confirmNewPassword!: string;
}
