import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn
  } from 'typeorm';
  import { User } from './user.entity'; 
import { UUID } from 'crypto';
  
  @Entity()
  export class Invite {
    @PrimaryGeneratedColumn()
    invite_id: number; // Primary key, auto-incremented by default (matches SERIAL)
  
    @Column('uuid')
    user_id: string; // UUID foreign key to User
  
    @Column('uuid')
    buddy_id: string; // UUID foreign key to User (for the buddy)
  
    @Column({ type: 'integer',nullable: true })
    invite_response: number; // Response, can be null, default is NULL
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_time: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_time: Date; 
  
    @ManyToOne(() => User, user => user.invites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User; 

    @ManyToOne(() => User, user => user.buddyInvites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'buddy_id' }) 
    buddy!: User; 
  }