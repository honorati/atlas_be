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
import { OrganizationPersons } from './organization-persons.entity';
import { Worlds } from '../worlds/worlds.entity';
import { Users } from '../users/users.entity';

@Index('organizations_pk', ['id'], { unique: true })
@Entity('organizations', { schema: 'public' })
export class Organizations {
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

   @OneToMany(
      () => OrganizationPersons,
      (organizationPersons) => organizationPersons.organization,
   )
   organizationPersons: OrganizationPersons[];

   @ManyToOne(() => Worlds, (worlds) => worlds.organizations)
   @JoinColumn([{ name: 'world_id', referencedColumnName: 'id' }])
   world: Worlds;

   @ManyToOne(() => Users, (users) => users.organizations)
   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
   user: Users;
}
