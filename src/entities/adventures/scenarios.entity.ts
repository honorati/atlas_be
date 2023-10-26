import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Encounters } from './encounters.entity';
import { Scenes } from './scenes.entity';
import { Treasures } from './treasures.entity';

@Index('scenarios_pkey', ['id'], { unique: true })
@Entity('scenarios', { schema: 'public' })
export class Scenarios {
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

  @OneToMany(() => Encounters, (encounters) => encounters.scenario)
  encounters: Encounters[];

  @ManyToOne(() => Scenes, (scenes) => scenes.scenarios)
  @JoinColumn([{ name: 'scene_id', referencedColumnName: 'id' }])
  scene: Scenes;

  @OneToMany(() => Treasures, (treasures) => treasures.scenario)
  treasures: Treasures[];
}
