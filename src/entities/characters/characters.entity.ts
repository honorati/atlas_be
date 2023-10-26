import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CharacterSheets } from '../character-sheets/character-sheets.entity';
import { OrganizationPersons } from '../organizations/organization-persons.entity';
import { Worlds } from '../worlds/worlds.entity';
import { Users } from '../users/users.entity';

@Index('persons_pkey', ['id'], { unique: true })
@Entity('characters', { schema: 'public' })
export class Characters {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 255 })
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
    () => CharacterSheets,
    (characterSheets) => characterSheets.character,
  )
  characterSheets: CharacterSheets[];

  @ManyToOne(() => Worlds, (worlds) => worlds.characters)
  @JoinColumn([{ name: 'world_id', referencedColumnName: 'id' }])
  world: Worlds;

  @ManyToOne(() => Users, (users) => users.characters)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @OneToOne(
    () => OrganizationPersons,
    (organizationPersons) => organizationPersons.person,
  )
  organizationPersons: OrganizationPersons;
}
