import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cities } from '../cities/cities.entity';
import { InterestPoints } from '../interest-points/interest-points.entity';
import { Planes } from '../planes/planes.entity';
import { Worlds } from '../../output/entities/Worlds';
import { Users } from '../../output/entities/Users';

@Index('world_reigns_pkey', ['id'], { unique: true })
@Entity('reigns', { schema: 'public' })
export class Reigns {
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

  @OneToMany(() => Cities, (cities) => cities.reign)
  cities: Cities[];

  @OneToMany(() => InterestPoints, (interestPoints) => interestPoints.reign)
  interestPoints: InterestPoints[];

  @ManyToOne(() => Planes, (planes) => planes.reigns)
  @JoinColumn([{ name: 'plane_id', referencedColumnName: 'id' }])
  plane: Planes;

  @ManyToOne(() => Worlds, (worlds) => worlds.reigns)
  @JoinColumn([{ name: 'world_id', referencedColumnName: 'id' }])
  world: Worlds;

  @ManyToOne(() => Users, (users) => users.reigns)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}