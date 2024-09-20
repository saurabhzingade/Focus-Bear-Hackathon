// base.entity.ts
import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Entity } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({ type: 'varchar', length: 300, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 300 })
    password: string;

    @Column({ type: 'varchar', length: 300 })
    firstName: string;

    @Column({ type: 'varchar', length: 300 })
    lastName: string;

    @Column({ type: 'varchar', length: 300, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 300})
    role: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastLoggedIn: Date;
}