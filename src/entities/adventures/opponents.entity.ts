import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   Index,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';
import { Encounters } from './encounters.entity';

@Index('opponents_pkey', ['id'], { unique: true })
@Entity('opponents', { schema: 'public' })
export class Opponents {
   @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
   id: number;

   @Column('varchar', { name: 'name', length: 100 })
   name: string;

   @Column('varchar', { name: 'title', nullable: true, length: 255 })
   title: string | null;

   @Column('integer', { name: 'experience', nullable: true })
   experience: number | null;

   @Column('integer', { name: 'quantity', nullable: true })
   quantity: number | null;

   @Column('text', { name: 'description', nullable: true })
   description: string | null;

   @Column('varchar', { name: 'image', nullable: true, length: 255 })
   image: string | null;

   @CreateDateColumn()
   createdAt: Date | null;

   @UpdateDateColumn()
   updatedAt: Date | null;

   @DeleteDateColumn()
   deletedAt: Date | null;

   @ManyToOne(() => Encounters, (encounters) => encounters.opponents)
   @JoinColumn([{ name: 'encounter_id', referencedColumnName: 'id' }])
   encounter: Encounters;
}
