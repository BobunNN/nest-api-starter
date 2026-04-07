import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30, nullable: true })
    firstName: string;

    @Column({ length: 30, nullable: true })
    lastName: string;

    @Column()
    email: string;
}
