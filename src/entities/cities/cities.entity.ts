import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Planes } from '../planes/planes.entity';
import { Reigns } from '../reigns/reigns.entity';
import { InterestPoints } from '../interest-points/interest-points.entity';
import { Users } from '../users/users.entity';
import { Worlds } from '../worlds/worlds.entity';

@Index('world_cities_pkey', ['id'], { unique: true })
@Entity('cities', { schema: 'public' })
export class Cities {
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

  @ManyToOne(() => Planes, (planes) => planes.cities)
  @JoinColumn([{ name: 'plane_id', referencedColumnName: 'id' }])
  plane: Planes;

  @ManyToOne(() => Reigns, (reigns) => reigns.cities)
  @JoinColumn([{ name: 'reign_id', referencedColumnName: 'id' }])
  reign: Reigns;

  @ManyToOne(() => Worlds, (worlds) => worlds.cities)
  @JoinColumn([{ name: 'world_id', referencedColumnName: 'id' }])
  world: Worlds;

  @ManyToOne(() => Users, (users) => users.cities)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @OneToMany(() => InterestPoints, (interestPoints) => interestPoints.city)
  interestPoints: InterestPoints[];
}
