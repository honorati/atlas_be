import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Scenarios } from './scenarios.entity';

@Index('treasures_pkey', ['id'], { unique: true })
@Entity('treasures', { schema: 'public' })
export class Treasures {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('character varying', { name: 'title', nullable: true, length: 255 })
  title: string | null;

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

  @ManyToOne(() => Scenarios, (scenarios) => scenarios.treasures)
  @JoinColumn([{ name: 'scenario_id', referencedColumnName: 'id' }])
  scenario: Scenarios;
}
