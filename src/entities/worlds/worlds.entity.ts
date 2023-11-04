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
import { Users } from '../users/users.entity';
import { Adventures } from '../adventures/adventures.entity';
import { Planes } from '../planes/planes.entity';
import { Characters } from '../characters/characters.entity';
import { Cities } from '../cities/cities.entity';
import { Organizations } from '../organizations/organizations.entity';
import { InterestPoints } from '../interest-points/interest-points.entity';
import { Reigns } from '../reigns/reigns.entity';

@Index('world_pkey', ['id'], { unique: true })
@Entity('worlds', { schema: 'public' })
export class Worlds {
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

   @ManyToOne(() => Users, (users) => users.worlds, { nullable: false })
   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
   user: Users;

   @OneToMany(() => Adventures, (adventures) => adventures.world)
   adventures: Adventures[];

   @OneToMany(() => Planes, (planes) => planes.world)
   planes: Planes[];

   @OneToMany(() => Cities, (cities) => cities.world)
   cities: Cities[];

   @OneToMany(() => Reigns, (reigns) => reigns.world)
   reigns: Reigns[];

   @OneToMany(() => InterestPoints, (interestPoints) => interestPoints.world)
   interestPoints: InterestPoints[];

   @OneToMany(() => Organizations, (organizations) => organizations.world)
   organizations: Organizations[];

   @OneToMany(() => Characters, (characters) => characters.world)
   characters: Characters[];
}
