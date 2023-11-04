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
import { Planes } from '../planes/planes.entity';
import { Reigns } from '../reigns/reigns.entity';
import { InterestPoints } from '../interest-points/interest-points.entity';
import { Users } from '../users/users.entity';
import { Worlds } from '../worlds/worlds.entity';

@Index('cities_pkey', ['id'], { unique: true })
@Entity('cities', { schema: 'public' })
export class Cities {
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
