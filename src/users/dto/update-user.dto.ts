import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ProfileDto } from './profile.dto';

export class UpdateUserDto extends
    IntersectionType(
        PartialType(CreateUserDto),
        ProfileDto,
    ) { }
