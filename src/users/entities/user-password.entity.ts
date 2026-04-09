import { User } from './user.entity';
import { Column, Entity, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm'


@Entity()
export class UserPassword {
    @PrimaryColumn()
    userId!: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Column({ length: 100 })
    hashedPassword!: string;
}
