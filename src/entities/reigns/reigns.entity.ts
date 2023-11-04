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
import { Planes } from '../planes/planes.entity';
import { Users } from '../users/users.entity';
import { Worlds } from '../worlds/worlds.entity';

@Index('reigns_pkey', ['id'], { unique: true })
@Entity('reigns', { schema: 'public' })
export class Reigns {
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
