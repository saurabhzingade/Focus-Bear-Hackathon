import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    Timestamp
} from 'typeorm';
import { Invite } from './invite.entity'; // Adjust the path as necessary

@Entity()
export class UnlockRequests {
    @PrimaryGeneratedColumn()
    unlock_request_id: number; // Primary key, auto-incremented by default

    @Column({ type: 'integer',nullable: true })
    invite_id: number; // UUID foreign key to User (for the buddy)

    @ManyToOne(() => Invite, invite => invite.unlockRequests, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'invite_id' }) // Specify the column name in the database
    invite: Invite; // The associated invite

    @Column({ type: 'timestamp'})
    timeFrom: Timestamp; // Timestamp for when the unlock request starts

    @Column({ type: 'timestamp'})
    timeTo: Timestamp; // Timestamp for when the unlock request ends

    @Column({ type: 'varchar' })
    reason: String; // Timestamp for when the unlock request ends


    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_time: Date; // Automatically set the creation time

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_time: Date; // Automatically set the update time
}