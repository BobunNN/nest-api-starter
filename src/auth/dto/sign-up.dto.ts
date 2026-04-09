import {
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';

function PasswordsMatch(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'passwordsMatch',
            target: (object as any).constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const obj = args.object as any;
                    return value === obj.password;
                },
                defaultMessage() {
                    return 'Passwords do not match';
                },
            },
        });
    };
}

export class SignUpDto extends CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @MaxLength(100, { message: 'Password is too long' })
    password!: string;

    @IsString()
    @IsNotEmpty({ message: 'Please confirm your password' })
    @PasswordsMatch()
    confirmPassword!: string;
}
