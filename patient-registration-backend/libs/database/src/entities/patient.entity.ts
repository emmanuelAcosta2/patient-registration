import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phoneCountryCode: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    documentPhoto: string;
}
