import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Encounters } from './encounters.entity';

@Index('opponents_pkey', ['id'], { unique: true })
@Entity('opponents', { schema: 'public' })
export class Opponents {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('character varying', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('integer', { name: 'experience', nullable: true })
  experience: number | null;

  @Column('integer', { name: 'quantity', nullable: true })
  quantity: number | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('character varying', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('timestamp without time zone', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('timestamp without time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Encounters, (encounters) => encounters.opponents)
  @JoinColumn([{ name: 'encounter_id', referencedColumnName: 'id' }])
  encounter: Encounters;
}
