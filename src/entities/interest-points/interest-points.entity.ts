import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   Generated,
   Index,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
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

   @Column('uuid', { name: 'unique_id' })
   @Generated('uuid')
   uniqueId: string;

   @Column('varchar', { name: 'name', length: 100 })
   name: string;

   @Column('varchar', { name: 'title', nullable: true, length: 255 })
   title: string | null;

   @Column('text', { name: 'description' })
   description: string;

   @Column('varchar', { name: 'image', nullable: true, length: 255 })
   image: string | null;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date | null;

   @DeleteDateColumn()
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
