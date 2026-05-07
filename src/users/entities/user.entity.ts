import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 30 })
    firstName!: string;

    @Column({ length: 30 })
    lastName!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ length: 20, nullable: true })
    phoneNumber?: string;

    @Column({ nullable: false, default: 'user' })
    role!: string;
}
