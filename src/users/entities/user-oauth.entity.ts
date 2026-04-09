import { User } from './user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class UserOauth {
    @PrimaryColumn()
    userId!: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Column({ nullable: false })
    provider!: string;

    @Column({ nullable: false })
    provider_user_id!: string;

    @Column({ nullable: false })
    access_token!: string;
}
