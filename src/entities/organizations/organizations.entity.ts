import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationPersons } from './organization-persons.entity';
import { Worlds } from '../worlds/worlds.entity';
import { Users } from '../users/users.entity';

@Index('organizations_pk', ['id'], { unique: true })
@Entity('organizations', { schema: 'public' })
export class Organizations {
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
