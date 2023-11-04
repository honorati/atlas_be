import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   Generated,
   Index,
   JoinColumn,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';
import { Cities } from '../cities/cities.entity';
import { InterestPoints } from '../interest-points/interest-points.entity';
import { Reigns } from '../reigns/reigns.entity';
import { Worlds } from '../worlds/worlds.entity';
import { Users } from '../users/users.entity';

@Index('planes_pkey', ['id'], { unique: true })
@Entity('planes', { schema: 'public' })
export class Planes {
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

   @OneToMany(() => Cities, (cities) => cities.plane)
   cities: Cities[];

   @OneToMany(() => InterestPoints, (interestPoints) => interestPoints.plane)
   interestPoints: InterestPoints[];

   @ManyToOne(() => Worlds, (worlds) => worlds.planes)
   @JoinColumn([{ name: 'world_id', referencedColumnName: 'id' }])
   world: Worlds;

   @ManyToOne(() => Users, (users) => users.planes)
   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
   user: Users;

   @OneToMany(() => Reigns, (reigns) => reigns.plane)
   reigns: Reigns[];
}
