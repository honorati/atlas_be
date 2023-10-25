import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Worlds } from './worlds.entity';

@Index('world_images_pkey', ['id'], { unique: true })
@Entity('world_images', { schema: 'public' })
export class WorldImages {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'image', length: 255 })
  image: string;

  @ManyToOne(() => Worlds, (world) => world.worldImages)
  @JoinColumn([{ name: 'world_id', referencedColumnName: 'id' }])
  world: Worlds;
}
