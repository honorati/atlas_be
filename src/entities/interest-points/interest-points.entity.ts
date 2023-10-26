import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from '../cities/cities.entity';
import { Planes } from '../planes/planes.entity';
import { Reigns } from '../reigns/reigns.entity';
import { Worlds } from '../worlds/worlds.entity';
import { Users } from '../users/users.entity';

@Index('interest_points_pkey', ['id'], { unique: true })
@Entity('interest_points', { schema: 'public' })
export class InterestPoints {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('character varying', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('text', { name: 'description' })
  description: string;

  @Column('character varying', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('timestamp without time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Cities, (cities) => cities.interestPoints)
  @JoinColumn([{ name: 'city_id', referencedColumnName: 'id' }])
  city: Cities;

  @ManyToOne(() => Planes, (planes) => planes.interestPoints)
  @JoinColumn([{ name: 'plane_id', referencedColumnName: 'id' }])
  plane: Planes;

  @ManyToOne(() => Reigns, (reigns) => reigns.interestPoints)
  @JoinColumn([{ name: 'reign_id', referencedColumnName: 'id' }])
  reign: Reigns;

  @ManyToOne(() => Worlds, (worlds) => worlds.interestPoints)
  @JoinColumn([{ name: 'world_id', referencedColumnName: 'id' }])
  world: Worlds;

  @ManyToOne(() => Users, (users) => users.interestPoints)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
