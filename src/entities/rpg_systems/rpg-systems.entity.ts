import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CharacterSheets } from '../character-sheets/character-sheets.entity';
import { RpgSystemCategories } from './rpg-system-categories.entity';
import { Users } from '../users/users.entity';

@Index('rpg_systems_pkey', ['id'], { unique: true })
@Entity('rpg_systems', { schema: 'public' })
export class RpgSystems {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'Id' })
  id: number;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('text', { name: 'Description', nullable: true })
  description: string | null;

  @Column('character varying', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('character varying', { name: 'source', nullable: true, length: 255 })
  source: string | null;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('timestamp without time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => CharacterSheets, (characterSheets) => characterSheets.system)
  characterSheets: CharacterSheets[];

  @OneToMany(
    () => RpgSystemCategories,
    (rpgSystemCategories) => rpgSystemCategories.system,
  )
  rpgSystemCategories: RpgSystemCategories[];

  @ManyToOne(() => Users, (users) => users.rpgSystems)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
