import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ProfileDto } from './profile.dto';

export class UpdateUserDto extends
    IntersectionType(
        OmitType(PartialType(CreateUserDto), ['email'] as const),
        ProfileDto,
    ) { }
